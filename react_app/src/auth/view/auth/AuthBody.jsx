import React, { useState, useEffect, useLayoutEffect,useRef } from "react";
import TextField from "./TextField";
import centralEnum from "./CentralEnum";
import { validateLoginFields } from "../../../utils/FieldsValidation";
import { login,refreshToken } from "../../repo/repo";

const AuthBody = ({ setCentralContent }) => {
  const fields_state = {
    validEmail: true,
    validPassword: true,
  };

  const [loginFieldsValidationState, setLoginFieldsValidationState] =
    useState(fields_state);
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const firstUpdate = useRef(true);

  async function run() {
    const object = validateLoginFields(email, senha);
    if (Object.values(object).every((value) => value === true)) {
      setResponseCode(await login(email, senha));
    } else {
      return;
    }
  }

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setLoginFieldsValidationState(validateLoginFields(email, senha));
  }, [email, senha]);

  useEffect(() => {
    console.log(responseCode);
  }, [responseCode]);

  return (
    <div className="authBody">
      <h1>Login</h1>
      <TextField
        placeholder="Email"
        validField={loginFieldsValidationState.validEmail}
        onChange={setEmail}
        invalidFieldMensage="Insira um e-mail válido"
      />
      <TextField
        placeholder="Senha"
        validField={loginFieldsValidationState.validPassword}
        onChange={setSenha}
        invalidFieldMensage="Insira uma senha válida"
      />
      <button
        onClick={() => {
          run();
        }}
      >
        LOGIN
      </button>
      <button onClick={async() => {
          console.log(await refreshToken() )
        }}>LOGIN GOOGLE</button>
      <h3
        onClick={() => {
          setCentralContent(centralEnum.passReset);
        }}
      >
        Esqueceu sua senha?
      </h3>
      <h3
        onClick={() => {
          setCentralContent(centralEnum.create);
        }}
      >
        Crie uma conta
      </h3>
    </div>
  );
};

export default AuthBody;
