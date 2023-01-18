import "./App.css";
import { useState } from "react";
import { Parser } from "expr-eval";

function App() {
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [freshStart, setFreshStart] = useState(false);

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
    if (subTotal === 0 || freshStart) {
      setSubTotal(key);
      setFreshStart(false);
    } else {
      switch (key) {
        case "AC":
          setTotal(0);
          setSubTotal(0);
          break;
        case ".":
          if (!/[^0-9]/.test(subTotal)) {
            setSubTotal(`${subTotal}.`);
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
          setSubTotal(`${subTotal}${key}`);
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          if (total == 0) {
            setTotal(`${subTotal}${key}`);
          } else {
            setTotal(`${total}${subTotal}${key}`);
          }
          setSubTotal(0);
          break;
        case "=":
          let parser = new Parser();
          let newTotal = parser.parse(`${total}${subTotal}`).evaluate();
          if (newTotal > 99999999999999) {
            newTotal = newTotal.toExponential(2);
          }
          setSubTotal(newTotal);
          setTotal(newTotal);
          setFreshStart(true);
          break;
      }
    }
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
