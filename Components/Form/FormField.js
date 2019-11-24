import React, { useState } from "react";
//import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Item, Input } from "native-base";

const FormField = ({ fields, updateField, id, placeholder, ...otherProps }) => {
  //need to pass what I will be using the input for so I can have a title for each and reuse component
  return (
    <Item rounded style={styles.container}>
      <Input
        placeholder={placeholder}
        onChangeText={text => updateField(id, text)}
        value={fields[id]}
        {...otherProps}
      />
    </Item>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: "gray",
    margin: 5,
    backgroundColor: "white"
  }
});

export default FormField;
