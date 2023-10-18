import './App.css';
import { useState } from "react";
import { evaluate } from "mathjs";

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState(' ');
  const [zero, setZero] = useState(true);
  

  
 

  const handleNumber = (event) =>{
    let number = event.target.textContent;
    const lastChar = formula[formula.length - 1];

    if (number === '.' && display.includes('.')) {
      return;
    }
    if (lastChar === ' ' && (number === '+' || number === '-')) {
      // Handle negative numbers and additional operators after a negative sign.
      setFormula(formula + number);
      setDisplay(number);
    } else if (lastChar === ' ' || lastChar === '+' || lastChar === '*' || lastChar === '/'){
      setFormula(formula + number);
      setDisplay(number);
    } 
    else if (formula.includes('=')){
      setFormula(number)
      setDisplay(number);
    }
    else {
      setFormula(formula + number);
      setDisplay(display + number);
    }
    setZero(false);
  }
  const handleOperator = (event) =>{
    const operator = event.target.textContent;
    const lastChar = formula[formula.length - 1];   
    if (operator === '-' && (lastChar === ' ' || lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/')) {
      // Handle negative sign after operators.
      setFormula(formula.slice(0, -1) + ' ' + operator);
      setDisplay('-');
    } else if (lastChar === ' ' || lastChar === '+' || lastChar === '*' || lastChar === '/') {
      // Update the last operator with the new one.
      setFormula(formula.slice(0, -2) + ' ' + operator + ' ');
      setDisplay(operator);
    } else if (lastChar === '-') {
      setFormula(formula.slice(0, -3) + ' ' + operator + ' ')
      setDisplay(operator);
    } else if (formula.includes("=")) {
      const previousResult = display;
      setFormula( previousResult + ' ' + operator + ' ');
      setDisplay(display);
    } else {
      // Append the operator to the formula
      setFormula(formula + ' ' + operator + ' ');
      setDisplay(operator);
    } 
    
  } 
  const handleClearButton = () =>{
    setDisplay("0");
    setFormula(" ");
    setZero(true);
  } 
  const handleEquals= () =>{
    try {
      if (formula.trim() === "") {
        setDisplay("0");
        setFormula(" ");
        setZero(true);
      } else {
        // Use math.js to evaluate the formula
        let currentFormula = formula; 
        let result = evaluate(currentFormula)
      //  let calculate = evaluate(formula); 
     //   console.log(`result is ${result}`);
        setDisplay(result);
        setFormula(formula + " = " + result);

      
      }
    } catch (error) {
      setDisplay('NaN');
      setFormula("NaN");
    }
  }
  return (
    <div className="App">
      <div className="cal-container"> 
      <div className="formula" >{formula}</div>
      <div className="output" id="display">{display}</div>
      <div className="button-wrapper">
      <button id="clear" value="AC" onClick={handleClearButton}>AC</button>
      <button id="divide" value="/" onClick={handleOperator}>/</button>
      <button id="multiply" value="*" onClick={handleOperator}>*</button>
      <button id="seven" value="7" onClick={handleNumber}>7</button>
      <button id="eight" value="8" onClick={handleNumber}>8</button>
      <button id="nine" value="9" onClick={handleNumber}>9</button>
      <button id="subtract" value="-" onClick={handleOperator}>-</button>
      <button id="four" value="4" onClick={handleNumber}>4</button>
      <button id="five" value="5" onClick={handleNumber}>5</button>
      <button id="six" value="6" onClick={handleNumber}>6</button>
      <button id="add" value="+" onClick={handleOperator}>+</button>
      <button id="one" value="1" onClick={handleNumber}>1</button>
      <button id="two" value="2" onClick={handleNumber}>2</button>
      <button id="three" value="3" onClick={handleNumber}>3</button>
      <button id="zero" value="0" onClick={handleNumber} disabled={zero}>0</button>
      <button id="decimal" value="." onClick={handleNumber}>.</button>
      <button id="equals" value="=" onClick={handleEquals}>=</button>

      </div>

      </div>
    </div>
  );
}
export default Calculator;
