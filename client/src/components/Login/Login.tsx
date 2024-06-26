import { useState } from "react";
import "./Login.css";
import { useLoginContext } from "../../utils/Context";

import { emailSvg, nameSvg, lockSvg, logo, fastLogo } from "../../utils/Assets";
import { LoginForm } from "../LoginForm/LoginForm";

const LoginModal = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const { loginUser, errorMsg, createUser, setErrorMsg } = useLoginContext();

  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({
      email: emailValue,
      password: passwordValue,
    });
    setEmailValue("");
    setPasswordValue("");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    createUser({
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      bag: [],
      isAdmin: false,
    });
    setNameValue("");
    setEmailValue("");
    setPasswordValue("");
  };

  const handleLoginOrRegister = () => {
    setIsRegister((prev) => !prev);
    setErrorMsg("");
    setEmailValue("");
    setPasswordValue("");
  };

  const handleChangeNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const handleChangeEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleChangePasswordValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordValue(e.target.value);
  };

  const inputsArray = [
    {
      name: "Name",
      svg: nameSvg,
      type: "text",
      value: nameValue,
      onChange: handleChangeNameValue,
    },
    {
      name: "Email",
      svg: emailSvg,
      type: "email",
      value: emailValue,
      onChange: handleChangeEmailValue,
    },
    {
      name: "Password",
      svg: lockSvg,
      type: "password",
      value: passwordValue,
      onChange: handleChangePasswordValue,
    },
  ];

  return (
    <div className="Login">
      <div className="kiraz-logo-container">
        <picture>
          <source srcSet={fastLogo} type="image/webp" width={100} />
          <img src={logo} alt="site's logo" id="kiraz-logo" width={100} />
        </picture>
      </div>
      <hr />
      <div className="title-container">
        <label htmlFor="Email">{isRegister ? "Sign Up" : "Sign In"}</label>
      </div>
      {errorMsg && <p id="error-msg">{errorMsg}</p>}

      <LoginForm
        handleChangeNameValue={handleChangeNameValue}
        handleLogIn={handleLogIn}
        handleRegister={handleRegister}
        inputsArray={inputsArray}
        isRegister={isRegister}
        nameSvg={nameSvg}
        nameValue={nameValue}
      />

      <hr />

      <p id="register">
        {isRegister ? "Already have an account?" : "Don't have an account?"}
        <span id="create-account-msg" onClick={handleLoginOrRegister}>
          {isRegister ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default LoginModal;
