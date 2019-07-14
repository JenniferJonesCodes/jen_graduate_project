import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

const FormField = (props) => {
  const [value, updateValue] = useState();

  //constructor(props) {
  //  super(props);
  //  this.state = '';
  //}

   //need to pass what I will be using the input for so I can have a title for each
        return (
          <TextInput style={styles.container}
            onChangeText={(text) => updateValue({text})}
            value={value}
            {...props}
          />
        );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
  }
});

export default FormField;
