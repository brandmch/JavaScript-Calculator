import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="calculator-container">
        <div className="screen r1">
          <div>
            <p style={{ fontSize: "large" }}>0</p>
            <p className="total">0</p>
          </div>
        </div>
        <div className="all-clear r2 box">AC</div>
        <div className="box r2">/</div>
        <div className="box r2">X</div>
        <div className="box r3">7</div>
        <div className="box r3">8</div>
        <div className="box r3">9</div>
        <div className="box r3">-</div>
        <div className="box r4">4</div>
        <div className="box r4">5</div>
        <div className="box r4">6</div>
        <div className="box r4">+</div>
        <div className="box r5">1</div>
        <div className="box r5">2</div>
        <div className="box r5">3</div>
        <div className="equals box">=</div>
        <div className="zero r6 box">0</div>
        <div className="box r6">.</div>
      </div>
    </div>
  );
}

export default App;
