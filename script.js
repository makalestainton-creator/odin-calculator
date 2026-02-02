const display = document.querySelector(".js-display");
const numbers = document.querySelectorAll(".js-number");
const operators = document.querySelectorAll(".js-operator");
const decimal = document.querySelector(".js-decimal");
const deleteButton = document.querySelector(".js-delete");
const clearAllButton = document.querySelector(".js-clear");
const equal = document.querySelector(".js-equal");
const bracket = document.querySelectorAll("js-bracket");

const utils = {
  num1: "",
  num2: "",
  sign: "",
};

function add(num1, num2) {
  return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
  return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
  return Number(num1) * Number(num2);
}

function divide(num1, num2) {
  return Number(num1) / Number(num2);
}

function operate() {
  let result;
  if (utils.sign.trim() === "+") {
    result = add(utils.num1, utils.num2);
  } else if (utils.sign.trim() === "-") {
    result = subtract(utils.num1, utils.num2);
  } else if (utils.sign.trim() === "X" || utils.sign.trim() === "*") {
    result = multiply(utils.num1, utils.num2);
  } else if (utils.sign.trim() === "/") {
    result = divide(utils.num1, utils.num2);
  }
  return result;
}

function displayResult(content) {
  if (content.length > 14) {
    display.textContent = content.slice(0, 15);
  }
  display.textContent = content;
}

function inputOperands(event) {
  if (!utils.sign || utils.num1 === "-") {
    if (utils.num1.length === 6) {
      return;
    }

    utils.num1 += event.target.textContent;
    displayResult(`${utils.num1} `);
  } else if (utils.sign && utils.num1) {
    if (utils.num2.length === 5) {
      return;
    }

    utils.num2 += event.target.textContent;
    displayResult(`${utils.num1} ${utils.sign} ${utils.num2}`);
  }
}

function addDecimalPoint(event) {
  if (utils.num1 && !utils.num2) {
    if (utils.num1.includes(".")) {
      return;
    }
    utils.num1 += event.target.textContent;
    displayResult(utils.num1);
  } else if (utils.num1 && utils.num2) {
    if (utils.num2.includes(".")) {
      return;
    }
    utils.num2 += event.target.textContent;
    displayResult(`${utils.num1} ${utils.sign} ${utils.num2}`);
  }
}

function addOperator(event) {
  if (event.target.textContent === "-") {
    if (utils.sign === "" && utils.num1 === "") {
      utils.num1 = "-";
      displayResult(`${utils.num1} `);
      return;
    } else if(utils.num1[0] === "-") {
      return;
    }
  }

  if (!utils.num1) {
    return;
  }

  if (utils.sign.includes(`${event.target.textContent}`)) {
    return;
  }

  if (utils.num1 && utils.sign && utils.num2) {
    utils.num1 = operate().toFixed(4);
    utils.num2 = "";
    displayResult(utils.num1);
  }
  utils.sign = event.target.textContent;
  display.textContent += utils.sign;
}

function evaluateExpression(event) {
  const answer = operate();
  if (isNaN(answer) || !isFinite(answer) || (!utils.num2)) {
    displayResult("Error!");
    utils.num1 = "";
    utils.num2 = "";
    utils.sign = "";
    return;
  } else {
    displayResult(answer.toFixed(2));
    utils.num1 = "";
    utils.num2 = "";
    utils.sign = "";
  }
}

function clearAll() {
  utils.num1 = "";
  utils.num2 = "";
  utils.sign = "";
  displayResult("");
}

function backSpace() {
  if (display.textContent.trim() === utils.num1) {
    utils.num1 = utils.num1.slice(0, -1);
    displayResult(utils.num1);
  } else if (
    display.textContent.trim() === `${utils.num1} ${utils.sign} ${utils.num2}`
  ) {
    utils.num2 = utils.num2.slice(0, -1);
    displayResult(`${utils.num1} ${utils.sign} ${utils.num2}`);
  }

  if (display.textContent.endsWith(`${utils.sign}`)) {
    utils.sign = "";
    displayResult(utils.num1);
  } else if (display.textContent.endsWith(` ${utils.sign} `)) {
    displayResult(`${utils.num1} ${utils.sign}`);
  } else if (display.textContent.endsWith(` ${utils.sign}`)) {
    utils.sign = "";
    displayResult(`${utils.num1} ${utils.sign} ${utils.num2}`);
  }
}

numbers.forEach((button) => {
  button.addEventListener("click", (event) => {
    inputOperands(event);
  });
});

decimal.addEventListener("click", (event) => {
  addDecimalPoint(event);
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    addOperator(event);
  });
});

equal.addEventListener("click", (event) => {
  evaluateExpression(event);
});

clearAllButton.addEventListener("click", () => {
  clearAll();
});

deleteButton.addEventListener("click", () => {
  backSpace();
});

document.body.addEventListener("keydown", (event) => {
  if (!isNaN(event.key)) {
    if (!utils.sign || utils.num1 === "-") {
      if (utils.num1.length === 6) {
        return;
      }

      utils.num1 += event.key;
      displayResult(`${utils.num1} `);
    } else if (utils.sign && utils.num1) {
      if (utils.num2.length === 5) {
        return;
      }

      utils.num2 += event.key;
      displayResult(`${utils.num1} ${utils.sign} ${utils.num2}`);
    }
  } else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "/" ||
    event.key === "*"
  ) {
    if (event.key === "-") {
      if (utils.sign === "" && utils.num1 === "") {
        utils.num1 = "-";
        displayResult(`${utils.num1} `);
        return;
      }
    }

    if (!utils.num1) {
      return;
    }

    if (utils.sign.includes(`${event.target.textContent}`)) {
      return;
    }

    if (utils.num1 && utils.sign && utils.num2) {
      utils.num1 = operate().toFixed(4);
      utils.num2 = "";
      displayResult(utils.num1);
    }
    utils.sign = event.key;
    display.textContent += utils.sign;
  } else if (event.key === ".") {
    if (utils.num1 && !utils.num2) {
      if (utils.num1.includes(".")) {
        return;
      }
      utils.num1 += event.key;
      displayResult(utils.num1);
    } else if (utils.num1 && utils.num2) {
      if (utils.num2.includes(".")) {
        return;
      }
      utils.num2 += event.key;
      displayResult(`${utils.num1} ${utils.sign} ${utils.num2}`);
    }
  } else if (event.key === "Enter" || event.key === "=") {
    evaluateExpression(event);
  } else if (event.key === "Backspace") {
    backSpace();
  } else if (event.key === "Delete") {
    clearAll();
  }
});
