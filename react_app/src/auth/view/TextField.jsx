const TextField = ({
  validField,
  placeholder,
  onChange,
  invalidFieldMensage,
}) => {
  return (
    <div className="textBody">
      {(() => {
        return (
          <div>
            {validField || validField===null ? null : <label>{invalidFieldMensage}</label>}
            <div className={validField || validField===null ? "inputEmail" : "inputEmailInvalid"}>
              <input
                className="inputSenha"
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
              ></input>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default TextField;
