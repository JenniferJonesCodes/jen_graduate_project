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
import { dataParser } from './lib/dataParser';

const initialState = {
  enabled: true,
  devices: [],
  selectedDevice: null,
  connected: false,
  error: false,
  data: {},
  isReading: false,
}
const actions = {
  devicesReceived: 'devicesReceived',
  disabled: 'disabled',
  deviceSelected: 'deviceSelected',
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
        data: {
          ...state.data,
          [action.payload.type]: action.payload.data,
        },
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

function dataReceived(type, data) {
  return {
    type: actions.dataReceived,
    payload: {
      type,
      data
    }
  }
}

const handleDataIn = dispatch => ({ data }) => {
  //console.log("TCL: data", data)
  // const parsedData = dataParser({data});
  // if (parsedData[0] != 'spo2' && parsedData[1].length >0){
  //   console.log("parsedData", parsedData);
  // }
  //const encoded = filterResults(convertStringToByteArray(data));
  //if (encoded.length) {
  // dispatch(dataReceived(encoded));
  //console.log("TCL: encoded", encoded)
  //}
  const [type, packetContents] = convertStringToByteArray(data);
  if (type) {
    dispatch(dataReceived(type, packetContents));
  }
}

function read(dispatch, readHandler) {
  return async function () {
    // const result = await Bluetooth.readFromDevice();
    // console.log("TCL: read -> result", result)
    await Bluetooth.withDelimiter('\U');
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

function handleLogData(data) {
  return function logData(_e) {
    console.log("TCL: handleLogData -> data", data)
  }
}

async function enableTemperature() {
  // const command = hexToBase64("55 AA 04 04 01 F6");
  // const command = "55 AA 04 04 01 F6";

  const didWrite = Bluetooth.write("0x55 0xaa 0x04 0x04 0x01 0xf6")
  //const didWrite = await Bluetooth.enableTemperature();
  console.log("didWrite enable temperature", didWrite);
}

async function disableSPO2() {
  const command = hexToBase64("55 aa 04 04 00 f8");
  // const command = "55 AA 04 03 00 F8";

  const didWrite = await Bluetooth.writeToDevice(command);
  console.log("didWrite disable sp02", didWrite);
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
        isReading && <LogDataButton onPress={handleLogData(data)} />
      }
      {
        isReading && <StopDataButton onPress={stopReading(dispatch, readHandler)} />
      }
      {
        typeof data.temperature !== 'undefined' && <DisplayTemperature data={data.temperature} />
      }
      {
        typeof data.temperature !== 'undefined' && <DisplaySpo2 data={data.spo2} />
      }
    </View>
  );
}

function DisplayTemperature({ data: { status, data } }) {
  return (
    <>
      <Text>Temperature</Text>
      <Text>status: {status} and value: {data}</Text>
    </>
  )
}

function DisplaySpo2({ data: { status, data } }) {
  return (
    <>
      <Text>Spo2</Text>
      <Text>status: {status} and saturation: {data.saturation} and PR: {data.pulseRate}</Text>
    </>
  )
}

function ReceiveDataButton(props) {
  return (
    <Button
      title="Read Data"
      type="outline"
      {...props}
    />
  )
}

function StopDataButton(props) {
  return (
    <Button
      title="Stop Data"
      type="outline"
      {...props}
    />
  )
}

function LogDataButton(props) {
  return (
    <Button
      title="Log Data"
      type="outline"
      {...props}
    />
  )
}


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default BluetoothClassic;
