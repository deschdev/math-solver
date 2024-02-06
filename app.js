const equationInput = document.getElementById("equation");
const equationOutput = document.getElementById("results");
const form = document.getElementById("equation-form");

// all the characters aside from the white space. / and *
const MULTIPLY_OR_DIVIDE = /(?<operand1>\S+)\s*(?<operation>[\/\*])\s*(?<operand2>\S+)/;
// all the characters aside from the white space, looks for scientific numbers as well . - and +
const ADD_OR_SUBTRACT = /(?<operand1>\S+)\s*(?<operation>(?<!e)[\-\+])\s*(?<operand2>\S+)/ ;
// all the characters aside from the white space, ^
const EXPONENT = /(?<operand1>\S+)\s*(?<operation>\^)\s*(?<operand2>\S+)/;
// match everything that is NOT ()
const PARENTHESIS = /\((?<equation>[^\(\)]*)\)/;

form.addEventListener("submit", event => {
  // preventing the form from submitting
  event.preventDefault();

  const result = answer(equationInput.value);
  // replacing the output with the result
  equationOutput.textContent = result;
});

const answer = (equation) => {
  // ()
  if (equation.match(PARENTHESIS)) {
    const subEquation = equation.match(PARENTHESIS).groups.equation;
    const result = answer(subEquation);
    const newEquation = equation.replace(PARENTHESIS, result);
    return answer(newEquation);
  // ^
  } else if (equation.match(EXPONENT)) {
    const result = handleMath(equation.match(EXPONENT).groups);
    const newEquation = equation.replace(EXPONENT, result)
    return answer(newEquation);
  // * OR /
  } else if (equation.match(MULTIPLY_OR_DIVIDE)) {
    const result = handleMath(equation.match(MULTIPLY_OR_DIVIDE).groups);
    const newEquation = equation.replace(MULTIPLY_OR_DIVIDE, result)
    return answer(newEquation);
  // + or -
  } else if (equation.match(ADD_OR_SUBTRACT)) {
    const result = handleMath(equation.match(ADD_OR_SUBTRACT).groups);
    const newEquation = equation.replace(ADD_OR_SUBTRACT, result)
    return answer(newEquation);
  }
  // return nothing if neither of the conditionals are met. If the user types in something without a number - the output will be NaN
  else {
    return parseFloat(equation);
  }
}

// destructuring the operands and operation into three parts
const handleMath = ({ operand1, operand2, operation }) => {
  const numOne = parseFloat(operand1);
  const numTwo = parseFloat(operand2);
// switch statement for which operation is being used +, -, *, or /
  switch (operation) {
    case "^":
      return numOne ** numTwo;
      break;
    case "*":
      return numOne * numTwo;
      break;
    case "/":
      return numOne / numTwo;
      break;
    case "+":
      return numOne + numTwo;
      break;
    case "-":
      return numOne - numTwo;
      break;
    default:
      return "Something went wrong"
      break;
    }
}