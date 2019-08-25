import React, { useState, useEffect, useReducer } from 'react';
import { DrawerActions } from 'react-navigation';
import { View } from 'react-native';

const initialState = (defaultFields = {}) => ({
  fields: defaultFields,
  error: null,
  success: null,
  inProgress: false
})

const events = {
  submit: 'submit',
  success: 'success',
  error: 'error',
  updateField: 'updateField'
}

function updateField(id, value) {
  return {
    type: events.updateField,
    payload: {
      id,
      value
    }
  }
}

function onSubmit() {
  return {
    type: events.submit
  }
}

function onError(error) {
  return {
    type: events.error,
    payload: {
      error
    }
  }
}

function onSuccess() {
  return {
    type: events.success
  }
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
      }
    case actions.updateField:
      return {
        ...state,
        formFields: {
          ...state.formFields,
          [action.payload.id]: action.payload.value
        }
      }
  }
}

function FormContainer({ render: RenderProp, defaultFields, onSubmit: submit, submitText = 'Submit', cancelText }) {
  const [state, dispatch] = useReducer(reducer, initialState(defaultFields));

  async function handleSubmit(event) {
    dispatch(onSubmit());
    try {
      await submit(state.fields);
      dispatch(onSuccess())
    } catch (error) {
      dispatch(onError(error.message))
    }
  }

  const { fields, error, success, inProgress } = state;
  return (
    <View >
      <RenderProp fields={fields} updateField={updateField} />
      <Button disabled={inProgress} onClick={handleSubmit}>
        {submitText}
      </Button>
      {error}
    </View>
  )
}

export default FormContainer;
