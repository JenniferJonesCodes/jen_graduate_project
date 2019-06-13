import React, { Component } from 'react';
import { StyleSheet,Text,View } from 'react-native';
import FormField from './../Components/Form/FormField';

export default class Vitals extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Vitals
        </Text>
        <FormField
          placeholder="Heart Rate"
        />
        <FormField
          placeholder="Blood Oxygen Level"
        />
        <FormField
          placeholder="Blood Pressure"
        />
        <FormField
          placeholder="Body Temperature"
        />
        <FormField
          placeholder="Respiratory Rate"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});