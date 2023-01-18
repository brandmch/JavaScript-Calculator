import "./App.css";
import { useState } from "react";
import { Parser } from "expr-eval";
import { buttons, checkIfMoreThan14, isValidKey } from "./utils/utils";

function App() {
  // total = top number
  // subTotal = bottom number
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  function buttonPress(key) {
    if (key === "Enter") {
      key = "=";
    } else if (key === "NumLock") {
      key = "AC";
    }
    let tempTotal = total;
    let tempSubTotal = subTotal === 0 ? "" : subTotal;

    if (key === "AC") {
      tempTotal = 0;
      tempSubTotal = 0;
    } else if (tempSubTotal === tempTotal) {
      tempTotal = `${tempTotal}${key}`;
      tempSubTotal = 0;
    } else {
      switch (key) {
        case ".":
          if (!/[^0-9]/.test(tempSubTotal)) {
            tempSubTotal = `${tempSubTotal}.`;
          }
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
          tempSubTotal = `${tempSubTotal}${key}`;
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          if (total === 0) {
            tempTotal = `${subTotal}${key}`;
          } else {
            tempTotal = `${total}${subTotal}${key}`;
          }
          tempSubTotal = 0;
          break;
        case "=":
          let parser = new Parser();
          let newTotal = parser.parse(`${total}${subTotal}`).evaluate();
          tempSubTotal = checkIfMoreThan14(newTotal);
          tempTotal = checkIfMoreThan14(newTotal);
          break;
        default:
          break;
      }
    }
    setTotal(tempTotal);
    setSubTotal(tempSubTotal);
  }

  // Key Bindings
  window.document.onkeydown = (e) => {
    if (isValidKey(e.key)) {
      buttonPress(e.key);
    }
  };
  function keydown({ key }) {
    switch (key) {
      case "Enter":
        key = "=";
        break;
      case "NumLock":
        key = "AC";
        break;
      default:
        break;
    }
    if (isValidKey(key)) {
      document.getElementById(key).style.backgroundColor = "#00ff00";
      document.getElementById(key).style.boxShadow = "none";
    }
  }
  function keyup({ key }) {
    switch (key) {
      case "Enter":
        key = "=";
        break;
      case "NumLock":
        key = "AC";
        break;
      default:
        break;
    }
    if (isValidKey(key)) {
      document.getElementById(key).style = {};
    }
  }
  document.addEventListener("keydown", keydown);
  document.addEventListener("keyup", keyup);

  return (
    <div className="App">
      <div className="calculator-container">
        <div className="screen r1">
          <div>
            <p style={{ fontSize: "large" }}>{total}</p>
            <p className="total">{subTotal}</p>
          </div>
        </div>
        {/* Array of buttons imported from utils */}
        {buttons.map((curr) => (
          <div
            key={curr[1]}
            className={curr[0]}
            id={curr[1]}
            onClick={(e) => buttonPress(e.target.id)}
          >
            {curr[1]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
