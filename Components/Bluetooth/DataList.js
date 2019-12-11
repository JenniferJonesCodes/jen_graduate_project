import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
//import { Button } from "react-native-elements";
import Connecting from "./Connecting";
import DeviceList from "./DeviceList";
import { Data, DataContainer } from "./Data";
import { usePatients } from "../../Entities/Patients";
import { useEncounter } from "../../Entities/Encounter";
import { useConcepts } from "../../Entities/Concepts";
import { Button, Text } from "native-base";

//bluetooth view
function DataList({
  state,
  readHandler,
  stopReading,
  enableBloodPressure,
  read,
  connect,
  dispatch
}) {
  const { activePatient } = usePatients();
  const { activeEncounter } = useEncounter();
  console.log("TCL: activeEncounter", activeEncounter);

  const stopReadingHandler = React.useCallback(
    stopReading(dispatch, readHandler),
    [dispatch, readHandler]
  );
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
      {connected && (
        <>
          <Text style={styles.text}>Connected to {selectedDevice.name}</Text>
          <Text style={styles.text}>Patient: {activePatient.display}</Text>
        </>
      )}
      {!isReading && connected && (
        <ReceiveDataButton
          disabled={isReading}
          onPress={read(dispatch, readHandler)}
        />
      )}
      {isReading && <StopDataButton onPress={stopReadingHandler} />}
      {isReading && <ReadBloodPressure onPress={enableBloodPressure} />}
      {typeof data.NIBP !== "undefined" && <DisplayNIBP data={data.NIBP} />}
      {typeof data.temperature !== "undefined" && (
        <DisplayTemperature data={data.temperature} />
      )}
      {typeof data.spo2 !== "undefined" && <DisplaySpo2 data={data.spo2} />}
      {connected && activePatient.uuid && (
        <SaveDataButton data={data} stopReading={stopReadingHandler} />
      )}
    </View>
  );
}

function SaveDataButton({ data, stopReading }) {
  const { activePatient } = usePatients();
  const { concepts } = useConcepts();
  const { create } = useEncounter();
  console.log("concepts ", concepts);
  function saveData() {
    stopReading();
    const obs = [];
    if (data.temperature.data) {
      obs.push({
        concept: concepts.temperature,
        value: data.temperature.data
      });
    }
    if (data.spo2.data.saturation) {
      obs.push({
        concept: concepts.spo2,
        value: data.spo2.data.saturation
      });
    }
    const params = {
      encounterType: "Patient Document",
      obs: obs
    };

    create(activePatient.uuid, params);
    console.log("spo2 ", data.spo2.data.saturation);
    console.log("temp ", data.temperature.data);
  }
  return concepts ? (
    <Button light rounded large block style={styles.button} onPress={saveData}>
      <Text>Save Data</Text>
    </Button>
  ) : null;
}

function DisplayNIBP({ data }) {
  const { status } = data;
  const { cuff, sys, dia } = data.data;
  console.log("TCL: DisplayNIBP -> data.data", data.data);
  return (
    <DataContainer title="BLOOD PRESSURE">
      <Data label="Status">{status} </Data>
      <Data label="Cuff Pressure"> {cuff}</Data>
      <Data label="Systolic"> {sys}</Data>
      <Data label="Diastolic"> {dia}</Data>
    </DataContainer>
  );
}

function DisplayTemperature({ data: { status, data } }) {
  return (
    <DataContainer title="TEMPERATURE">
      <Data label="Status">{status} </Data>
      <Data label="Temperature">{data}</Data>
    </DataContainer>
  );
}

function DisplaySpo2({ data: { status, data } }) {
  return (
    <DataContainer title="SPO2">
      <Data label="Status">{status} </Data>
      <Data label="Saturation">{data.saturation}</Data>
      <Data label="Pulse Rate">{data.pulseRate}</Data>
    </DataContainer>
  );
}

function ReadBloodPressure(props) {
  return (
    <Button light rounded block style={styles.button} {...props}>
      <Text>Read Blood Pressure</Text>
    </Button>
  );
}

function ReceiveDataButton(props) {
  return (
    <Button light rounded block style={styles.button} {...props}>
      <Text>Read Data</Text>
    </Button>
  );
}

function StopDataButton(props) {
  return (
    <Button light rounded block style={styles.button} {...props}>
      <Text>Stop Data</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  text: {
    fontSize: 25,
    padding: 5,
    fontWeight: "500",
    color: "#302a29",
    fontFamily: "sans-serif-medium"
  },
  button: {
    fontFamily: "monospace",
    margin: 10
  }
});

export default DataList;
