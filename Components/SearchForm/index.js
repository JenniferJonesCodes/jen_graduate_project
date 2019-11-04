import React, { useState, useEffect, useReducer } from "react";
import FormContainer from "../Form/FormContainer";
import FormField from "../Form/FormField";

//persons selected person
const initialState = {
  persons: [],
  slectedPerson: null
};

const SearchForm = props => {
  //const [state, setState] = useState(null);

  return (
    <FormContainer
      onSubmit={fields => {
        console.log("form submit", fields);
        // something like this to submit data and save in state
        //const result = await login(fields);
        //setState(result);
      }}
      submitText="Search"
      render={({ fields, updateField }) => (
        <>
          <FormField
            placeholder=" first name"
            id="first_name"
            fields={fields}
            updateField={updateField}
          />
          <FormField
            placeholder="last name"
            id="last_name"
            fields={fields}
            updateField={updateField}
          />
        </>
      )}
    />
  );
};

export default SearchForm;
