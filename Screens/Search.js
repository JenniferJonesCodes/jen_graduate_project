import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FormField from './../Components/Form/FormField';

const Search = () => (
  <View style={styles.container}>
    <Text style={styles.title}>
      Search
    </Text>
    <FormField 
      // secureTextEntry
      // value="hello"
      placeholder="Patient Last Name"
      // placeholderTextColor="gray"
    />
    </View>
  );

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

export default Search;
