import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";
import { useMutation, useManualQuery, ClientContext } from "graphql-hooks";

const SIGNUP_MUTATION = `mutation($name:String!, $email:String!, $password:String!, $image:String!){
  createUser(userInput:{name:$name,email:$email,password:$password,image:$image}){
    _id
    email
    name
  }
}`;

const Auth = () => {
  const client = useContext(ClientContext);
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const LOGIN_QUERY = `query($email:String!, $password:String!){
  login(email:$email,password:$password){
    userId
    token
    tokenExpiration
  }
}`;

  const [signUpUser] = useMutation(SIGNUP_MUTATION);
  const [loginUser] = useManualQuery(LOGIN_QUERY);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const loggingin = await loginUser({
          variables: {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
        });

        client.setHeader(
          "Authorization",
          `Bearer ${loggingin.data.login.token}`
        );
        auth.login(loggingin.data.login.userId, loggingin.data.login.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        // formData.append('email', formState.inputs.email.value);
        // formData.append('name', formState.inputs.name.value);
        // formData.append('password', formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "upload-image",
          "PUT",
          formData
        );
        const imageUrl = responseData.imageUrl || "undefined";
        await signUpUser({
          variables: {
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            image: imageUrl,
          },
        });
        const loggingin = await loginUser({
          variables: {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
        });

        client.setHeader(
          "Authorization",
          `Bearer ${loggingin.data.login.token}`
        );
        auth.login(loggingin.data.login.userId, loggingin.data.login.token);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image."
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
