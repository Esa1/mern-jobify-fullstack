import React from "react";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "../components";

export const action = async (data) => {
  console.log("hello from register page action");
  console.log(data);
  return null;
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="John" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="Smith"
        />
        <FormRow type="text" name="location" defaultValue="Turku" />
        <FormRow type="email" name="email" defaultValue="john@gmail.com" />
        <FormRow type="password" name="password" defaultValue="secret123" />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn" />
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
