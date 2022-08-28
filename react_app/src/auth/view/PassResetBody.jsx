
import centralEnum from "./CentralEnum"
import TextField from "./TextField";
import {isEmailValid} from "../../utils/FieldsValidation";
import { sendResetPasswordEmail } from "../repo/repo";
import React, {useState, useRef,useLayoutEffect,useEffect} from "react";


const PassResetBody = ({setCentralContent}) => {
  const validEmail =true
  
  
  const [loginFieldsValidationState,setLoginFieldsValidationState] = useState(validEmail);
  const [email,setEmail] = useState(null);
  const firstUpdate = useRef(true);
  const [responseCode, setResponseCode] = useState(null);

  async function run() {
    const object = isEmailValid(email);
    if (Object.values(object).every((value) => value === true)) {
      setResponseCode(await sendResetPasswordEmail(email));
    } else {
      return;
    }
  }

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setLoginFieldsValidationState(isEmailValid(email));
  }, [email]);

  useEffect(() => {
    console.log(responseCode);
  }, [responseCode]);

  return (
    <div className="authBody">
        <h1>Redefinir senha:</h1>
        <br/>
        <p>Insira seu e-mail abaixo e lhe enviaremos
        um e-mail com link para redefinição de senha.</p>
        
        <TextField  placeholder = "Email" label= "Email" validField = {loginFieldsValidationState} onChange = {setEmail} invalidFieldMensage = "Insira um e-mail válido"/>
        <button onClick = {()=>{run()}}>Enviar</button>
        <h3 onClick = {()=>{setCentralContent(centralEnum.login)}}>Login</h3>

        

    </div>
  );
};

export default PassResetBody;