import React, { useState, useEffect, useReducer } from "react";
import { DrawerActions } from "react-navigation";
import { View, Button } from "react-native";

const initialState = (defaultFields = {}) => ({
  fields: defaultFields,
  error: null,
  success: null,
  inProgress: false
});

const actions = {
  submit: "submit",
  success: "success",
  error: "error",
  updateField: "updateField"
};

function updateField(id, value) {
  return {
    type: actions.updateField,
    payload: {
      id,
      value
    }
  };
}

function onSubmit() {
  return {
    type: actions.submit
  };
}

function onError(error) {
  return {
    type: actions.error,
    payload: {
      error
    }
  };
}

function onSuccess() {
  return {
    type: actions.success
  };
}

function reducer(state, action) {
  switch (action.type) {
    case actions.submit:
      return {
        ...state,
        inProgress: true,
        error: false,
        success: false
      };
    case actions.error:
      return {
        ...state,
        error: true,
        inProgress: false,
        success: false
      };
    case actions.success:
      return {
        ...state,
        error: false,
        inProgress: false,
        success: true
      };
    case actions.updateField:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.id]: action.payload.value
        }
      };
  }
}

function FormContainer({
  render: RenderProp,
  defaultFields,
  onSubmit: submit,
  submitText = "Submit",
  cancelText
}) {
  const [state, dispatch] = useReducer(reducer, initialState(defaultFields));

  async function handleSubmit(event) {
    console.log("submitting form");
    dispatch(onSubmit());
    try {
      await submit(state.fields);
      dispatch(onSuccess());
    } catch (error) {
      dispatch(onError(error.message));
    }
  }

  function onUpdateField(id, value) {
    console.log("TCL: onUpdateField -> id, value", id, value);
    dispatch(updateField(id, value));
  }

  const { fields, error, success, inProgress } = state;
  console.log("TCL: state", state);
  return (
    <View>
      <RenderProp fields={fields} updateField={onUpdateField} />
      <Button disabled={inProgress} onPress={handleSubmit} title={submitText} />
      {error}
    </View>
  );
}

export default FormContainer;
