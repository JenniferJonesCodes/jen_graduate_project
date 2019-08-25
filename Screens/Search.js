import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import FormField from './../Components/Form/FormField';

const Search = () => (
  <View style={styles.conatiner}>
    <Text style={styles.title}>
      Search
    </Text>
    <FormField 
      placeholder="Patient Last Name"
    />
    <FormField 
      placeholder="Patient First Name"
    />
    <Button
      title="Search"
      color="#841584"
      accessibilityLabel="Search"
    />
    <Button
      title="New Patient"
      color="#841584"
      accessibilityLabel="New Patient"
    />
  </View>
);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    // textAlign: 'center',
    // margin: 10,
  }
});

export default Search;
