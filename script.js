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
  const MAX_COUNT_NUMBER = 8;

  function roundingNumber(number) {
    if (number.length > MAX_COUNT_NUMBER) {
      let indexPoint = number.indexOf(".");
      if (indexPoint > MAX_COUNT_NUMBER || indexPoint == -1) {
        firstString = null;
        secondString = null;
        firstStringIsWrite = false;
        sign = null;
        return "Error";
      } else {
        number = Number(number)
          .toFixed(MAX_COUNT_NUMBER - indexPoint)
          .toString();
          
        while (number.endsWith("0") || number.endsWith(".")) {
          if (number.endsWith(".")) {
            number = number.substring(0, number.length - 1);
            break;
          }
          number = number.substring(0, number.length - 1);
        }
        return number;
      }
    }
    return number;
  }

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
        if (
          firstString.includes(".") ||
          firstString.length >= MAX_COUNT_NUMBER - 1
        ) {
          return;
        }
        firstString = firstString + ".";
        output.value = firstString;
      } else {
        if (
          secondString.includes(".") ||
          secondString.length >= MAX_COUNT_NUMBER - 1
        ) {
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
            output.value = roundingNumber(firstString.toString());
            sign = null;
            secondString = null;
            break;

          case "-":
            firstString = Number(firstString) - Number(secondString);
            output.value = roundingNumber(firstString.toString());
            sign = null;
            secondString = null;
            break;

          case "*":
            firstString = Number(firstString) * Number(secondString);
            output.value = roundingNumber(firstString.toString());
            sign = null;
            secondString = null;
            break;

          case "/":
            firstString = Number(firstString) / Number(secondString);
            output.value = roundingNumber(firstString.toString());
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
            output.value = roundingNumber(firstString.toString());
            sign = "+";
            secondString = null;
            break;

          case "-":
            firstString = Number(firstString) - Number(secondString);
            output.value = roundingNumber(firstString.toString());
            sign = "-";
            secondString = null;
            break;

          case "*":
            firstString = Number(firstString) * Number(secondString);
            output.value = roundingNumber(firstString.toString());
            sign = "*";
            secondString = null;
            break;

          case "/":
            firstString = Number(firstString) / Number(secondString);
            output.value = roundingNumber(firstString.toString());
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
