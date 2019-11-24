import React from "react";
import FormContainer from "../Form/FormContainer";
import FormField from "../Form/FormField";

const LoginForm = ({ onSubmit }) => {
  return (
    <FormContainer
      onSubmit={onSubmit}
      submitText="Login"
      render={({ fields, updateField }) => (
        <>
          <FormField
            placeholder="username"
            id="username"
            fields={fields}
            autoCapitalize="none"
            updateField={updateField}
          />
          <FormField
            placeholder="password"
            id="password"
            type="password"
            fields={fields}
            secureTextEntry
            updateField={updateField}
          />
        </>
      )}
    />
  );
};

export default LoginForm;
