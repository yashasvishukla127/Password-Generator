import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import usePasswordGenerator from "./Hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/strenghtChecker";
import Button from "./components/Button";

function App() {
  const [length, setLength] = useState(20);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const [copied, setCopied] = useState(false);

  const checkBoxHandler = (i) => {
    const updatedCheckBoxData = [...checkboxData];
    updatedCheckBoxData[i].state = !updatedCheckBoxData[i].state;
    setCheckboxData(updatedCheckBoxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();
  return (
    <div className="container">
      {/* password and copy button */}
      <div className="heading">
        <div>{password}</div>
        <Button text={copied ? "copied" : "copy"} customClass="copyBtn" onClick={handleCopy}/>
      </div>
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
      </div>

      <div className="checkboxes">
        {/* checkboxex */}

        {checkboxData.map((checkbox, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                onChange={() => checkBoxHandler(index)}
                checked={checkbox.state}
              />
              <label>{checkbox.title}</label>
            </div>
          );
        })}
      </div>

      <PasswordStrengthIndicator password={password} />

      {/* errorHandling */}
      {errorMessage && <div className="errorMsg">{errorMessage}</div>}

      <div>
        {/* generate password  */}
        <Button text="Generate password" customClass="gntbtn" onClick={() => generatePassword(checkboxData, length)}/>
      </div>
    </div>
  );
}

export default App;
