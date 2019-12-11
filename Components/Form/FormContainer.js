import React, { useReducer } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Button, Text } from "native-base";

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
        error: action.payload.error,
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
    dispatch(onSubmit());
    try {
      await submit(state.fields);
      dispatch(onSuccess());
    } catch (error) {
      dispatch(onError(error.message));
    }
  }

  function onUpdateField(id, value) {
    dispatch(updateField(id, value));
  }

  const { fields, error, success, inProgress } = state;
  return (
    <View>
      <RenderProp fields={fields} updateField={onUpdateField} />
      <Button
        light
        rounded
        block
        disabled={inProgress}
        onPress={handleSubmit}
        style={styles.button}
      >
        {inProgress ? (
          <ActivityIndicator size="small" color="#000000" />
        ) : (
          <Text>{submitText}</Text>
        )}
      </Button>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    fontFamily: "monospace",
    marginTop: 20
  },
  errorText: {
    maxWidth: "70%",
    textAlign: "center",
    color: "red",
    marginTop: 10
  }
});

export default FormContainer;
