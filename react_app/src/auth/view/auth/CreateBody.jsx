import centralEnum from "./CentralEnum";
import TextField from "./TextField";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { validateSigninFields } from "../../../utils/FieldsValidation";
import { createUser } from "../../repo/repo";

const CreateBody = ({ setCentralContent }) => {
  const fields_state = {
    validEmail: true,
    validPassword: true,
    validPassConf: true,
    validUsername: true,
  };

  const [loginFieldsValidationState, setLoginFieldsValidationState] =
    useState(fields_state);
  const [email, setEmail] = useState(null);

  const [senha, setSenha] = useState(null);

  const [username, setUsername] = useState(null);

  const [passConf, setPassConf] = useState(null);

  const [responseCode, setResponseCode] = useState(null);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setLoginFieldsValidationState(
      validateSigninFields(email, senha, username, passConf)
    );
  }, [email, senha, username, passConf]);


  async function run() {
    const object = validateSigninFields(email, senha, username, passConf);
    if (Object.values(object).every((value) => value === true)) {
      setResponseCode(await createUser(email, senha, username));
    } else {
      return;
    }
  }

  useEffect(() => {
    console.log(responseCode);
  }, [responseCode]);

  return (
    <div className="authBody">
      <h1>Crie sua conta:</h1>
      <TextField
        placeholder="Nome de usuário"
        label="Email"
        validField={loginFieldsValidationState.validUsername}
        onChange={setUsername}
        invalidFieldMensage="O nome de usuário não pode conter caracteres especiais , e deve possuir 3 dígitos ou mais:"
      />
      <TextField
        placeholder="Email"
        label="Email"
        validField={loginFieldsValidationState.validEmail}
        onChange={setEmail}
        invalidFieldMensage="Insira um e-mail válido:"
      />
      <TextField
        placeholder="Senha"
        label="Senha"
        validField={loginFieldsValidationState.validPassword}
        onChange={setSenha}
        invalidFieldMensage="A senha deve conter 5 dígitos, números, letras minúsculas, letras maiúsculas e caracteres especiais:"
      />
      <TextField
        placeholder="Confirme a senha"
        label="Senha"
        validField={loginFieldsValidationState.validPassConf}
        onChange={setPassConf}
        invalidFieldMensage="Confirmação de senha incorreta:"
      />
      <button
        onClick={() => {
          run();
        }}
      >
        Cadastrar
      </button>
      <h3
        onClick={() => {
          setCentralContent(centralEnum.resend);
        }}
      >
        Reenviar e-mail de confirmação
      </h3>
      <h3
        onClick={() => {
          setCentralContent(centralEnum.login);
        }}
      >
        Já possui uma conta?
      </h3>
    </div>
  );
};

export default CreateBody;
