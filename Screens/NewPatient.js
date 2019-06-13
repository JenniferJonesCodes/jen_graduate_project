import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import NewPatientForm from './../Components/PatientForms/NewPatientForm';

const NewPatient = () => (
  <View>
    <Text style={styles.title}>
      New Patient
    </Text>
    <NewPatientForm />
  </View>
);

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    }
  });
  
  export default NewPatient;
  