import React, { useRef } from 'react';
import './Calculator.css';

const Calculator = () => {
    const inputRef = useRef();
    //initializing the variables here which are used ahead
    let newKey = '';
    let firstVariable = '';
    let secondVariable = '';
    let operator = '';
    let result;

    const pressedKey = (key) => {
        try {
            //Here we're checking that is it a valid number and for dot for the decimals
            if (!isNaN(key) || key === '.') {

                newKey += key;
                inputRef.current.value = newKey;

            }
            // Here we're evaluating the operators and storing the value respectively
            else if (key === '+' || key === '-' || key === 'x' || key === '÷' || key === '%') {

                if (newKey === '') throw new Error('Please enter a number before an operator.');
                firstVariable = newKey;
                operator = key;
                newKey = '';
                inputRef.current.value = key;

            }
            // Here we're handling the equal and then switch which will check the operator and perform accordingly
            else if (key === '=') {

                if (operator === '') throw new Error('Please enter an operator.');
                if (newKey === '') throw new Error('Please enter a second number.');
                secondVariable = newKey;
                firstVariable = parseFloat(firstVariable);
                secondVariable = parseFloat(secondVariable);

                switch (operator) {

                    case '+':
                        result = firstVariable + secondVariable;
                        break;
                    case '-':
                        result = firstVariable - secondVariable;
                        break;
                    case 'x':
                        result = firstVariable * secondVariable;
                        break;
                    case '÷':
                        if (secondVariable === 0) throw new Error('Cannot divide by zero.');
                        result = firstVariable / secondVariable;
                        break;
                    case '%':
                        result = (firstVariable / secondVariable) * 100;
                        break;
                    default:
                        throw new Error('Unknown operation.');

                }

                inputRef.current.value = result;
                newKey = result.toString();
                firstVariable = '';
                secondVariable = '';
                operator = '';

            }
            // Handling the AC button
            else if (key === 'AC') {

                inputRef.current.value = '';
                newKey = '';
                firstVariable = '';
                secondVariable = '';
                operator = '';

            }

            else if (key === '+/-') {  //Handling the Toggler
                if (newKey !== '') {
                    newKey = (parseFloat(newKey) * -1).toString();
                    inputRef.current.value = newKey;

                } else {
                    // If the input is empty, show an error or just do nothing
                    throw new Error('No number to toggle sign.');

                }
            }
            // Else throw the error
            else {

                throw new Error('Invalid input.');

            }

        } catch (error) {

            console.error(error.message);
            inputRef.current.value = 'Error';  // displaying the error message
            setTimeout(() => {

                inputRef.current.value = newKey || firstVariable || '';

            }, 1500);

        }
    };

    return (
        <div className="container">
            <div className="calculator">
                <div className="display">
                    <input className='dis-inp' ref={inputRef} id="diss" type="text" readOnly />
                </div>
                <div className="button">
                    <button style={{ color: 'black' }} onClick={() => pressedKey('AC')} className="grey butt">AC</button>
                    <button style={{ color: 'black' }} onClick={() => pressedKey('+/-')} className="grey butt">+/-</button>
                    <button style={{ color: 'black' }} onClick={() => pressedKey('%')} className="grey butt">%</button>
                    <button onClick={() => pressedKey('÷')} className="yellow butt">÷</button>
                </div>
                <div className="button1">
                    <button onClick={() => pressedKey('7')} className="butt">7</button>
                    <button onClick={() => pressedKey('8')} id="hey" className="butt">8</button>
                    <button onClick={() => pressedKey('9')} className="butt">9</button>
                    <button onClick={() => pressedKey('x')} className="yellow butt">x</button>
                </div>
                <div className="button2">
                    <button onClick={() => pressedKey(4)} className="butt">4</button>
                    <button onClick={() => pressedKey(5)} className="butt">5</button>
                    <button onClick={() => pressedKey(6)} className="butt">6</button>
                    <button onClick={() => pressedKey('-')} className="yellow butt">-</button>
                </div>
                <div className="button3">
                    <button onClick={() => pressedKey(1)} className="butt">1</button>
                    <button onClick={() => pressedKey(2)} className="butt">2</button>
                    <button onClick={() => pressedKey(3)} className="butt">3</button>
                    <button onClick={() => pressedKey('+')} className="yellow butt">+</button>
                </div>
                <div className="button4">
                    <button onClick={() => pressedKey(0)} id="zerobutton" className="butt">0</button>
                    <button onClick={() => pressedKey('.')} className="butt">.</button>
                    <button onClick={() => pressedKey('=')} className="yellow butt">=</button>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
