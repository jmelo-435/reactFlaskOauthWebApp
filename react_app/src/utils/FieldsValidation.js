

export function isEmailValid (email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test( String(email)
    .toLowerCase())
;
}

function isPassValid  (pass) {
  const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{4,}$/
    return re.test(String(pass))

}

function isPassValidForLogin  (pass) {
  return (String(pass)!=="");

}

function isUsernameValid  (userName) {
  return String(userName).match(
      "^[A-Za-z0-9_-]*$"
      ) && String(userName).length > 2

}

function isPassConfValid  (pass,passConf) {
  return String(pass)===String(passConf)

}
 
export function validateLoginFields(email,pass) {
    const fields_state={
        validEmail:true,
        validPassword:true
      }
    fields_state.validEmail = isEmailValid(email)
    fields_state.validPassword = isPassValidForLogin(pass)

    return fields_state

}

export function validateSigninFields(email,pass,userName,passConf) {
  const fields_state={
      validEmail:true,
      validPassword:true,
      validUsername:true,
      validPassConf:true
    }
  fields_state.validEmail = isEmailValid(email)
  fields_state.validPassword = isPassValid(pass)
  fields_state.validUsername = isUsernameValid(userName)
  fields_state.validPassConf = isPassConfValid(pass,passConf)

  return fields_state

}

