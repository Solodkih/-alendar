window.onload = function () {
  const one = document.getElementById("1");
  const two = document.getElementById("2");
  const three = document.getElementById("3");
  const four = document.getElementById("4");
  const five = document.getElementById("5");
  const six = document.getElementById("6");
  const seven = document.getElementById("7");
  const eight = document.getElementById("8");
  const nine = document.getElementById("9");
  const zero = document.getElementById("0");
  const add = document.getElementById("+");
  const sub = document.getElementById("-");
  const equal = document.getElementById("=");
  const mul = document.getElementById("*");
  const div = document.getElementById("/");
  const point = document.getElementById(".");
  const backspace = document.getElementById("backspace");
  const clear = document.getElementById("C");
  let output = document.getElementById("result");
  let firstString = null;
  let secondString = null;
  let sign = null;
  let firstStringIsWrite = false;
  let arrayNumber = [zero, one, two, three, four, five, six, seven, eight, nine];
  let arrayOfOperations = [add, sub, mul, div];
  const MAX_LENGHT_DISPLAY = 3;
  const MAX_COUNT_NUMBER = 8;

  function changeString(string, newSymbol) {
    if (string == null) {
      string = newSymbol;
      output.value = string;
      return string;
    } else if (string.length < MAX_COUNT_NUMBER) {
      string = string + newSymbol;
      output.value = string;
      return string;
    } else {
      return string;
    }
  }

  arrayNumber.forEach((item, i) => {
    let newSymbol = i.toString();
    function handlerChangeString() {
      if (!firstStringIsWrite) {
        firstString = changeString(firstString, newSymbol);
      } else {
        secondString = changeString(secondString, newSymbol);
      }
    }
    item.addEventListener("click", handlerChangeString, false);
  });

  clear.addEventListener(
    "click",
    () => {
      output.value = "0";
      firstString = null;
      secondString = null;
      firstStringIsWrite = false;
      sign = null;
    },
    false
  );

  backspace.addEventListener(
    "click",
    () => {
      if (!firstStringIsWrite) {
        if (firstString.length == 1) {
          firstString = "0";
          output.value = firstString;
          return;
        }
        firstString = firstString.substring(0, firstString.length - 1);
        output.value = firstString;
      } else {
        if (secondString.length == 1) {
          secondString = "0";
          output.value = secondString;
          return;
        }
        secondString = secondString.substring(0, secondString.length - 1);
        output.value = secondString;
      }
    },
    false
  );

  point.addEventListener(
    "click",
    () => {
      if (!firstStringIsWrite) {
        if (firstString.includes(".")) {
          return;
        }
        firstString = firstString + ".";
        output.value = firstString;
      } else {
        if (secondString.includes(".")) {
          return;
        }
        secondString = secondString + ".";
        output.value = secondString;
      }
    },
    false
  );

  equal.addEventListener(
    "click",
    () => {
      console.log(`firstString = ${firstString}
		secondString = ${secondString};
		sign = ${sign}`);
      if (firstStringIsWrite && secondString != null) {
        switch (sign) {
          case "+":
            firstString = Number(firstString) + Number(secondString);
            output.value = firstString.toFixed(MAX_LENGHT_DISPLAY).toString();
            sign = null;
            secondString = null;
            break;

          case "-":
            firstString = Number(firstString) - Number(secondString);
            output.value = firstString.toFixed(MAX_LENGHT_DISPLAY).toString();
            sign = null;
            secondString = null;
            break;

          case "*":
            firstString = Number(firstString) * Number(secondString);
            output.value = firstString.toFixed(MAX_LENGHT_DISPLAY).toString();
            sign = null;
            secondString = null;
            break;

          case "/":
            firstString = Number(firstString) / Number(secondString);
            output.value = firstString.toFixed(MAX_LENGHT_DISPLAY).toString();
            sign = null;
            secondString = null;
            break;
          default:
            break;
        }
      }
    },
    false
  );

  arrayOfOperations.forEach((item) => {
    function handlerOperation() {
      if (firstStringIsWrite && secondString != null) {
        switch (sign) {
          case "+":
            firstString = Number(firstString) + Number(secondString);
            output.value = firstString.toFixed(MAX_LENGHT_DISPLAY).toString();
            sign = "+";
            secondString = null;
            break;

          case "-":
            firstString = Number(firstString) - Number(secondString);
            output.value = firstString.toFixed(MAX_LENGHT_DISPLAY).toString();
            sign = "-";
            secondString = null;
            break;

          case "*":
            firstString = Number(firstString) * Number(secondString);
            output.value = firstString.toFixed(MAX_LENGHT_DISPLAY).toString();
            sign = "*";
            secondString = null;
            break;

          case "/":
            firstString = Number(firstString) / Number(secondString);
            output.value = firstString.toFixed(MAX_LENGHT_DISPLAY).toString();
            sign = "/";
            secondString = null;
            break;

          default:
            break;
        }
      } else {
        firstStringIsWrite = true;
      }
      sign = item.id;
    }
    item.addEventListener("click", handlerOperation, false);
  });
};
