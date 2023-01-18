import "./App.css";
import { useState } from "react";
import { Parser } from "expr-eval";

function App() {
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const buttons = [
    ["all-clear r2 box", "AC"],
    ["box r2", "/"],
    ["box r2", "*"],
    ["box r3", "7"],
    ["box r3", "8"],
    ["box r3", "9"],
    ["box r3", "-"],
    ["box r4", "4"],
    ["box r4", "5"],
    ["box r4", "6"],
    ["box r4", "+"],
    ["box r5", "1"],
    ["box r5", "2"],
    ["box r5", "3"],
    ["equals box btm-right", "="],
    ["zero r6 box btm-left", "0"],
    ["box r6", "."],
  ];

  function buttonPress(key) {
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
          if (newTotal.toString().split("").length > 14) {
            newTotal = newTotal.toFixed(4);
            if (newTotal.toString().split("").length > 14) {
              newTotal = parseInt(newTotal).toExponential(2);
            }
          }
          tempSubTotal = newTotal;
          tempTotal = newTotal;
          break;
        default:
          break;
      }
    }
    setTotal(tempTotal);
    setSubTotal(tempSubTotal);
  }

  return (
    <div className="App">
      <div className="calculator-container">
        <div className="screen r1">
          <div>
            <p style={{ fontSize: "large" }}>{total}</p>
            <p className="total">{subTotal}</p>
          </div>
        </div>
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
