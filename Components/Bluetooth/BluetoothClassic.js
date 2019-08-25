import React, { useReducer, useEffect, useCallback } from 'react';
import Bluetooth from 'react-native-bluetooth-serial';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button } from 'react-native-elements';
import Connecting from './Connecting';
import DeviceList from './DeviceList';
import { hexToBase64, convertStringToByteArray, filterResults } from './lib/converters';

const initialState = {
  enabled: true,
  devices: [],
  selectedDevice: null,
  connected: false,
  error: false,
  data: [],
  isReading: false,
}
const actions = {
  devicesReceived: "devicesReceived",
  disabled: "disabled",
  deviceSelected: "deviceSelected",
  connected: 'connected',
  connectingFailed: 'connectingFailed',
  startedReading: 'startedReading',
  stoppedReading: 'stoppedReading',
  dataReceived: 'dataReceived',
}

function reducer(state, action) {
  switch (action.type) {
    case actions.devicesReceived:
      return {
        ...state,
        devices: action.payload.devices
      }
    case actions.disabled:
      return {
        ...initialState,
        enabled: false,
      }
    case actions.deviceSelected:
      return {
        ...state,
        selectedDevice: action.payload.device,
      }
    case actions.connected:
      return {
        ...state,
        connected: true,
      }
    case actions.connectingFailed:
      return {
        ...state,
        connected: false,
        error: true,
      }
    case actions.startedReading:
      return {
        ...state,
        isReading: true,
        data: initialState.data,
      }
    case actions.stoppedReading:
      return {
        ...state,
        isReading: false,
      }
    case actions.dataReceived:
      return {
        ...state,
        data: [...state.data, action.payload.data]
      }
    default: return state;
  }
}

function devicesReceived(devices) {
  return {
    type: actions.devicesReceived,
    payload: {
      devices,
    }
  }
}

function bluetoothDisabled() {
  return {
    type: actions.disabled,
  }
}

function deviceSelected(device) {
  return {
    type: actions.deviceSelected,
    payload: {
      device,
    }
  }
}

function connected() {
  return {
    type: actions.connected,
  }
}

function connectingFailed() {
  return {
    type: actions.connectingFailed,
  }
}

function connect(dispatch) {
  return async function (device) {
    dispatch(deviceSelected(device));
    try {
      await Bluetooth.connect(device.id);
      dispatch(connected())
    } catch (error) {
      dispatch(connectingFailed());
      console.log(error);
    }
  }
}

function startedReading() {
  return {
    type: actions.startedReading,
  }
}

function dataReceived(data) {
  return {
    type: actions.dataReceived,
    payload: {
      data
    }
  }
}

const handleDataIn = dispatch => ({ data }) => {
  const encoded = filterResults(convertStringToByteArray(data));
  if (encoded.length) {
    // dispatch(dataReceived(encoded));
    console.log("TCL: encoded", encoded)
  }
}

function read(dispatch, readHandler) {
  return async function () {
    await Bluetooth.withDelimiter('\n');
    try {
      dispatch(startedReading());
      Bluetooth.on('read', readHandler)
    } catch (error) {
      console.log('error reading or writing', error)
    }
  }
}

function stoppedReading() {
  return {
    type: actions.stoppedReading,
  }
}

function stopReading(dispatch, readHandler) {
  return function () {
    Bluetooth.removeListener('read', readHandler)
    dispatch(stoppedReading());
  }
}

async function writeTemperature() {
  const temperatureCommand = hexToBase64("55 AA 04 04 01 F6");
  const didWrite = await Bluetooth.writeToDevice(temperatureCommand);
  console.log("didWrite", didWrite);
}

function BluetoothClassic() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // runs when component is initialized
  useEffect(() => {
    Bluetooth.isEnabled()
      .then(async enabled => {
        if (enabled) {
          const devices = await Bluetooth.list();
          dispatch(devicesReceived(devices));
        } else {
          dispatch(bluetoothDisabled());
          console.log('bluetooth is not enabled');
        }
      })
  }, []); // due to empty dependency array will only run once

  const readHandler = useCallback(handleDataIn(dispatch), [dispatch]);

  const { enabled, devices, selectedDevice, error, connected, isReading, data } = state;

  return (
    <View>
      {
        !enabled && (
          <Text style={styles.title}>
            Please enable bluetooth and pair with the device to continue
            </Text>
        )
      }
      {
        error && <Text>There was an error connecting</Text>
      }
      {
        enabled && devices && !selectedDevice && <DeviceList onSelect={connect(dispatch)} devices={devices} />
      }
      {
        enabled && selectedDevice && !connected && <Connecting device={selectedDevice} />
      }
      {
        connected && <Text>Connected to {selectedDevice.name}</Text>
      }
      {
        connected && <ReceiveDataButton disabled={isReading} onPress={read(dispatch, readHandler)} />
      }
      {
        isReading && <StopDataButton onPress={stopReading(dispatch, readHandler)} />
      }
      {
        connected && isReading && <EnableTemparature onPress={writeTemperature} />
      }
    </View>
  );
}

function ReceiveDataButton({ onPress }) {
  return (
    <Button
      title="Read Data"
      type="outline"
      onPress={onPress}
    />
  )
}

function StopDataButton({ onPress }) {
  return (
    <Button
      title="Stop Data"
      type="outline"
      onPress={onPress}
    />
  )
}

function EnableTemparature({ onPress }) {
  return (<Button
    title="Enable Temperature"
    type="outline"
    onPress={onPress}
  />);
}


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default BluetoothClassic;
