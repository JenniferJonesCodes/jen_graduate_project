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
import { hexToBase64, convertStringToByteArray } from './lib/converters';

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

function handleDataIn(dispatch) {
  return function ({ data }) {

    //parsed data
    const [type, packetContents] = convertStringToByteArray(data);
    if (type) {
      dispatch(dataReceived(type, packetContents));
    }
  }
}

function read(dispatch, readHandler) {
  return async function () {
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

  //usecallback prevents readHandler from being a new function every time we rerender, we want to stop reading on same listner not a new one
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
        isReading && <ReadBloodPressure onPress={enableBloodPressure} />
      }
      {
        typeof data.NIBP !== 'undefined' && <DisplayNIBP data={data.NIBP} />
      }
      {
        typeof data.temperature !== 'undefined' && <DisplayTemperature data={data.temperature} />
      }
      {
        typeof data.spo2 !== 'undefined' && <DisplaySpo2 data={data.spo2} />
      }
    </View>
  );
}


function DisplayNIBP({ data }){
  const { status } = data;
  const { cuff, sys, mean, dia } = data.data;
  console.log("TCL: DisplayNIBP -> data.data", data.data)
  return(
    <>
      <Text>BLOOD PRESSURE</Text>
      <Text>status: {status}</Text> 
      <Text>cuff: {cuff}</Text> 
      <Text>sys: {sys}</Text> 
      <Text>dia: {dia}</Text> 
    </>
  )
}

function DisplayTemperature({ data: { status, data } }) {
  return (
    <>
      <Text>TEMPERATURE</Text>
      <Text>status: {status} </Text>
      <Text>value: {data}</Text>
    </>
  )
}

function DisplaySpo2({ data: { status, data } }) {
  return (
    <>
      <Text>SPO2</Text>
      <Text>status: {status} </Text>
      <Text>saturation: {data.saturation} </Text>
      <Text>PR: {data.pulseRate}</Text>
    </>
  )
}

function ReadBloodPressure(props){
  return (
    <Button 
      title="Read Blood Pressure"
      type="outline"
      {...props}
    />
  )
}

//enable 55 aa 4 2 1 f8 disable 55 aa 4 2 0 f9
async function enableBloodPressure(){
  const command = hexToBase64("55 aa 04 02 01 f8");
  // console.log("TCL: enableBloodPressure -> command", command)
  const didWrite = await Bluetooth.writeToDevice(command)
  // console.log("TCL: enableBloodPressure -> didWrite", didWrite)
  return didWrite
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
