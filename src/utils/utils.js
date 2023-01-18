// All buttons on the calculator
// Placed here to avoid manually creating <div>s in the return
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

// Checks if a number is longer than 14 digits before displaying it on the calculator
// Returns edited Number
const checkIfMoreThan14 = (num) => {
  let tempNum = num;
  if (tempNum.toString().split("").length > 14) {
    tempNum = tempNum.toFixed(4);
    if (tempNum.toString().split("").length > 14) {
      tempNum = parseInt(tempNum).toExponential(2);
    }
  }
  return tempNum;
};

// Checks if pressed key is icluded on the calculator or not
// Returns Boolean
const isValidKey = (key) => {
  let isValid;
  switch (key) {
    case ".":
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
    case "+":
    case "-":
    case "*":
    case "/":
    case "Enter":
    case "NumLock":
    case "=":
    case "AC":
      isValid = true;
      break;
    default:
      isValid = false;
      break;
  }
  return isValid;
};

export { buttons, checkIfMoreThan14, isValidKey };
