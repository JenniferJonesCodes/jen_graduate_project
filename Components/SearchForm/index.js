import React, { useState, useEffect, useReducer } from "react";
import { StyleSheet, Text } from "react-native";
import FormContainer from "../Form/FormContainer";
import FormField from "../Form/FormField";
import { usePatients } from "../../Entities/Patients";
import PatientsList from "../Patient/PatientsList";

const SearchForm = ({ onSubmit }) => {
  return (
    <>
      <Text style={styles.title}>Search</Text>
      <FormContainer
        onSubmit={onSubmit}
        submitText="Search"
        render={({ fields, updateField }) => (
          <>
            <FormField
              placeholder="patient name or id"
              id="q"
              fields={fields}
              updateField={updateField}
            />
          </>
        )}
      />
      <PatientsList />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#302a29",
    marginBottom: 20
  }
});

export default SearchForm;
