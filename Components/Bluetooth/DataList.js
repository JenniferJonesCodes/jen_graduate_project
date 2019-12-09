import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Connecting from "./Connecting";
import DeviceList from "./DeviceList";
import { hexToBase64 } from "./lib/converters";
import { Data, DataContainer } from "./Data";
import { usePatients } from "../../Entities/Patients";
import { useEncounter } from "../../Entities/Encounter";
import { useConcepts } from "../../Entities/Concepts";

//bluetooth view
function DataList({
  state,
  readHandler,
  stopReading,
  handleLogData,
  read,
  connect,
  dispatch
}) {
  const { activePatient } = usePatients();
  const {
    enabled,
    devices,
    selectedDevice,
    error,
    connected,
    isReading,
    data
  } = state;
  return (
    <View>
      {!enabled && (
        <Text style={styles.title}>
          Please enable bluetooth and pair with the device to continue
        </Text>
      )}
      {error && <Text>There was an error connecting</Text>}
      {enabled && devices && !selectedDevice && (
        <DeviceList onSelect={connect(dispatch)} devices={devices} />
      )}
      {enabled && selectedDevice && !connected && (
        <Connecting device={selectedDevice} />
      )}
      {connected && <Text>Connected to {selectedDevice.name}</Text>}
      {connected && (
        <ReceiveDataButton
          disabled={isReading}
          onPress={read(dispatch, readHandler)}
        />
      )}
      {isReading && <LogDataButton onPress={handleLogData(data)} />}
      {isReading && (
        <StopDataButton onPress={stopReading(dispatch, readHandler)} />
      )}
      {isReading && <ReadBloodPressure onPress={enableBloodPressure} />}
      {typeof data.NIBP !== "undefined" && <DisplayNIBP data={data.NIBP} />}
      {typeof data.temperature !== "undefined" && (
        <DisplayTemperature data={data.temperature} />
      )}
      {typeof data.spo2 !== "undefined" && <DisplaySpo2 data={data.spo2} />}
      {activePatient.uuid && <SaveDataButton data={data} />}
    </View>
  );
}

function SaveDataButton({ data }) {
  const { activePatient } = usePatients();
  const { concepts } = useConcepts();
  const { create } = useEncounter();
  console.log("concepts ", concepts);
  function saveData() {
    const params = {
      encounterType: "Patient Document",
      obs: [
        {
          concept: concepts.temperature,
          value: data.temperature.data
        },
        {
          concept: concepts.spo2,
          value: data.spo2.data.saturation
        }
      ]
    };
    console.log("saveData -> activePatient", activePatient.uuid);
    console.log("saveData -> data", data);
    create(activePatient.uuid, params);
    console.log("spo2 ", data.spo2.data.saturation);
    console.log("spo2 ", data.temperature.data);
  }
  return concepts ? (
    <Button title="Save Data" type="outline" onPress={saveData} />
  ) : null;
}

function DisplayNIBP({ data }) {
  const { status } = data;
  const { cuff, sys, dia } = data.data;
  console.log("TCL: DisplayNIBP -> data.data", data.data);
  return (
    <DataContainer title="BLOOD PRESSURE">
      <Data label="status">{status} </Data>
      <Data label="cuff pressure"> {cuff}</Data>
      <Data label="systolic"> {sys}</Data>
      <Data label="diastolic"> {dia}</Data>
    </DataContainer>
  );
}

function DisplayTemperature({ data: { status, data } }) {
  return (
    <DataContainer title="TEMPERATURE">
      <Data label="status">{status} </Data>
      <Data label="temperature">{data}</Data>
    </DataContainer>
  );
}

function DisplaySpo2({ data: { status, data } }) {
  return (
    <DataContainer title="SPO2">
      <Data label="status">{status} </Data>
      <Data label="saturation">{data.saturation}</Data>
      <Data label="pulse rate">{data.pulseRate}</Data>
    </DataContainer>
  );
}

function ReadBloodPressure(props) {
  return <Button title="Read Blood Pressure" type="outline" {...props} />;
}

//enable 55 aa 4 2 1 f8 disable 55 aa 4 2 0 f9
async function enableBloodPressure() {
  const command = hexToBase64("55 aa 04 02 01 f8");
  // console.log("TCL: enableBloodPressure -> command", command)
  const didWrite = await Bluetooth.writeToDevice(command);
  // console.log("TCL: enableBloodPressure -> didWrite", didWrite)
  return didWrite;
}

function ReceiveDataButton(props) {
  return <Button title="Read Data" type="outline" {...props} />;
}

function StopDataButton(props) {
  return <Button title="Stop Data" type="outline" {...props} />;
}

function LogDataButton(props) {
  return <Button title="Log Data" type="outline" {...props} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default DataList;
