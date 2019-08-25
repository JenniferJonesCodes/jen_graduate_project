import React, { Component } from 'react';
import { StyleSheet,Text,View } from 'react-native';
import FormContainer from '../Form/FormContainer';
import FormField from '../Form/FormField';

const NewPatientForm = () => (
    <View style={styles.container}>
        <Text style={styles.title}>
            New Patient Form
        </Text>
        <FormContainer>
            <FormField 
                placeholder="Patient Last Name"
            />
            <FormField 
                placeholder="Patient First Name"
            />
            <FormField 
                placeholder="Patient Date of Birth"
            />
        </FormContainer>
    </View>
)

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    }
  });
  
  export default NewPatientForm;
  