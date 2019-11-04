import React from "react";
import FormContainer from "../Form/FormContainer";
import FormField from "../Form/FormField";
import client from "../../rest_client";

const {
  session: { create: login }
} = client;

const LoginForm = props => {
  console.log("TCL: client", client);
  console.log("TCL: login", login);
  return (
    <FormContainer
      onSubmit={async fields => {
        console.log("form submit", fields);
        // something like this to submit data and save in state
        //const result = await search(fields);
        //setState(result);
        const success = await login(fields);
        if (!success) throw new Error("could not login");
        console.log("login success");
      }}
      submitText="Login"
      render={({ fields, updateField }) => (
        <>
          <FormField
            placeholder="username"
            id="user_name"
            fields={fields}
            updateField={updateField}
          />
          <FormField
            placeholder="password"
            id="password"
            fields={fields}
            updateField={updateField}
          />
        </>
      )}
    />
  );
};

export default LoginForm;
