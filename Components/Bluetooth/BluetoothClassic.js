import React, { useReducer, useEffect, useCallback } from "react";
import Bluetooth from "react-native-bluetooth-serial";
import { convertStringToByteArray } from "./lib/converters";
import DataList from "./DataList";
import { hexToBase64 } from "./lib/converters";

const BluetoothContext = React.createContext({});
const useBluetooth = () => React.useContext(BluetoothContext);

//state for testing with app without machine
const testInitialState = {
  enabled: true,
  devices: [],
  selectedDevice: {
    name: "berryMed Test"
  },
  connected: true,
  error: false,
  data: {
    // NIBP: {
    //   status: "normal",
    //   data: {
    //     sys: 100,
    //     cuff: 100,
    //     dia: 100
    //   }
    // },
    temperature: {
      status: "normal",
      data: "37.5"
    },
    spo2: {
      status: "normal",
      data: {
        saturation: 99,
        pulseRate: 70
      }
    }
  },
  isReading: true
};

const initialState = {
  enabled: true,
  devices: [],
  selectedDevice: null,
  connected: false,
  error: false,
  data: {},
  isReading: false
};

const actions = {
  devicesReceived: "devicesReceived",
  disabled: "disabled",
  deviceSelected: "deviceSelected",
  connected: "connected",
  connectingFailed: "connectingFailed",
  startedReading: "startedReading",
  stoppedReading: "stoppedReading",
  dataReceived: "dataReceived"
};

//takes state and action, based off action will update state
function reducer(state, action) {
  switch (action.type) {
    case actions.devicesReceived:
      return {
        ...state,
        devices: action.payload.devices
      };
    case actions.disabled:
      return {
        ...initialState,
        enabled: false
      };
    case actions.deviceSelected:
      return {
        ...state,
        selectedDevice: action.payload.device
      };
    case actions.connected:
      return {
        ...state,
        error: false,
        isReading: false,
        connected: true
      };
    case actions.connectingFailed:
      return {
        ...state,
        connected: false,
        error: true,
        selectedDevice: null
      };
    case actions.startedReading:
      return {
        ...state,
        isReading: true,
        data: initialState.data
      };
    case actions.stoppedReading:
      return {
        ...state,
        isReading: false
      };
    case actions.dataReceived:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.type]: action.payload.data
        }
      };
    default:
      return state;
  }
}

function devicesReceived(devices) {
  return {
    type: actions.devicesReceived,
    payload: {
      devices
    }
  };
}

function bluetoothDisabled() {
  return {
    type: actions.disabled
  };
}

function deviceSelected(device) {
  return {
    type: actions.deviceSelected,
    payload: {
      device
    }
  };
}

function connected() {
  return {
    type: actions.connected
  };
}

function connectingFailed() {
  return {
    type: actions.connectingFailed
  };
}

function startedReading() {
  return {
    type: actions.startedReading
  };
}

function dataReceived(type, data) {
  return {
    type: actions.dataReceived,
    payload: {
      type,
      data
    }
  };
}

function connect(dispatch) {
  return async function(device) {
    dispatch(deviceSelected(device));
    try {
      await Bluetooth.connect(device.id);
      dispatch(connected());
    } catch (error) {
      dispatch(connectingFailed());
      console.log(error);
    }
  };
}

function handleDataIn(dispatch) {
  return function({ data }) {
    //parsed data
    const [type, packetContents] = convertStringToByteArray(data);
    if (type) {
      dispatch(dataReceived(type, packetContents));
    }
  };
}

//subscription to data over bluetooth, sets up listener for read event
//runs when readButton is clicked, sets up delimeter
function read(dispatch, readHandler) {
  return async function() {
    await Bluetooth.withDelimiter("U");
    try {
      dispatch(startedReading());
      Bluetooth.on("read", readHandler);
    } catch (error) {
      console.log("error reading or writing", error);
    }
  };
}

function stoppedReading() {
  return {
    type: actions.stoppedReading
  };
}

function stopReading(dispatch, readHandler) {
  return function() {
    Bluetooth.removeListener("read", readHandler);
    dispatch(stoppedReading());
  };
}

//enable 55 aa 4 2 1 f8 disable 55 aa 4 2 0 f9
async function enableBloodPressure() {
  const command = hexToBase64("55 aa 04 02 01 f8");
  // console.log("TCL: enableBloodPressure -> command", command)
  const didWrite = await Bluetooth.writeToDevice(command);
  // console.log("TCL: enableBloodPressure -> didWrite", didWrite)
  return didWrite;
}

export function BluetoothProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // runs when component is initialized
  useEffect(() => {
    Bluetooth.isEnabled().then(async enabled => {
      if (enabled) {
        //list - lists paired BT devices in BT lib
        const devices = await Bluetooth.list();
        dispatch(devicesReceived(devices));
      } else {
        dispatch(bluetoothDisabled());
        console.log("bluetooth is not enabled");
      }
    });
  }, []); // due to empty dependency array will only run once

  //usecallback prevents readHandler from being a new function every time we rerender (memoize it)
  //we want to stop reading on same listner not a new one
  const readHandler = useCallback(handleDataIn(dispatch), [dispatch]);

  return (
    <BluetoothContext.Provider
      value={{
        state,
        readHandler,
        stopReading,
        enableBloodPressure,
        read,
        connect,
        dispatch
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
}

function BluetoothClassic() {
  const {
    state,
    readHandler,
    stopReading,
    enableBloodPressure,
    read,
    connect,
    dispatch
  } = useBluetooth();

  return (
    <DataList
      state={state}
      readHandler={readHandler}
      stopReading={stopReading}
      enableBloodPressure={enableBloodPressure}
      read={read}
      connect={connect}
      dispatch={dispatch}
    />
  );
}

export default BluetoothClassic;
