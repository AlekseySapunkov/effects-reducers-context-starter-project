import React, { useEffect, useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
const emailReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.includes("@"),
    };
  } else if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.includes("@"),
    };
  }
  return {
    value: "",
    isValid: false,
  };
};
const Login = (props) => {
  const [inputPassword, setInputPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [email, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  const { isValid: emailIsValid } = email;
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailIsValid && inputPassword.length > 7);
    }, 2000);
    return () => {
      clearTimeout(timer);
      console.log("Clean");
    };
  }, [emailIsValid, inputPassword]);
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") && inputPassword.trim().length > 7
    );
  };

  const passwordChangeHandler = (event) => {
    setInputPassword(event.target.value);

    setFormIsValid(event.target.value.trim().length > 7 && email.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(inputPassword.trim().length > 7);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(email.value, inputPassword);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            email.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={inputPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
