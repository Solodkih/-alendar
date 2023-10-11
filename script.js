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
  const singNumber = document.getElementById("+/-");

  let output = document.getElementById("result");
  let signFirstString = "";
  let firstString = null;
  let signSecondString = "";
  let secondString = null;
  let sign = null;
  let firstStringIsWrite = false;
  let arrayNumber = [zero, one, two, three, four, five, six, seven, eight, nine];
  let arrayOfOperations = [add, sub, mul, div];
  const MAX_COUNT_NUMBER = 8;

  arrayNumber.forEach((item) => {
    function handlerChangeString() {
      store.dispatch({ type: item.id, payload: item.id });
    }
    item.addEventListener("click", handlerChangeString);
  });

  clear.addEventListener("click", () => {
    store.dispatch({ type: clear.id });
  });

  point.addEventListener("click", () => {
    store.dispatch({ type: point.id });
  });

  arrayOfOperations.forEach((item) => {
    function handlerChangeString() {
      store.dispatch({ type: item.id });
    }
    item.addEventListener("click", handlerChangeString);
  });

  singNumber.addEventListener("click", () => {
    store.dispatch({ type: singNumber.id });
  });

  backspace.addEventListener("click", () => {
    store.dispatch({ type: backspace.id });
  });

  equal.addEventListener("click", () => {
    store.dispatch({ type: equal.id });
  });


  /*
  function roundingNumber(number) {
    if (Number(number) < 0) {
      number = number.substring(1, number.length);
      signFirstString = "-";
    }
    if (number.length > MAX_COUNT_NUMBER || number == Infinity) {
      let indexPoint = number.indexOf(".");
      if (indexPoint > MAX_COUNT_NUMBER || indexPoint == -1) {
        firstString = null;
        secondString = null;
        firstStringIsWrite = false;
        signFirstString = "";
        signSecondString = "";
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
      signFirstString = "";
      signSecondString = "";
    },
    false
  );

  backspace.addEventListener(
    "click",
    () => {
      if (!firstStringIsWrite) {
        if (firstString == null) {
          return;
        }
        if (firstString.length == 1) {
          firstString = "0";
          output.value = firstString;
          return;
        }
        firstString = firstString.substring(0, firstString.length - 1);
        output.value = firstString;
      } else {
        if (secondString == null) {
          return;
        }
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
        if (firstString == null) {
          firstString = "0";
        }
        if (
          firstString.includes(".") ||
          firstString.length >= MAX_COUNT_NUMBER - 1
        ) {
          return;
        }
        firstString = firstString + ".";
        output.value = firstString;
      } else {
        if (secondString == null) {
          secondString = "0";
        }
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
      if (firstStringIsWrite && secondString != null) {
        switch (sign) {
          case "+":
            firstString =
              Number(signFirstString + firstString) +
              Number(signSecondString + secondString);
            firstString = roundingNumber(firstString.toString());
            output.value = signFirstString + firstString;
            sign = null;
            secondString = null;
            break;

          case "-":
            firstString =
              Number(signFirstString + firstString) -
              Number(signSecondString + secondString);
            firstString = roundingNumber(firstString.toString());
            output.value = signFirstString + firstString;
            sign = null;
            secondString = null;
            break;

          case "*":
            firstString =
              Number(signFirstString + firstString) *
              Number(signSecondString + secondString);
            firstString = roundingNumber(firstString.toString());
            output.value = signFirstString + firstString;
            sign = null;
            secondString = null;
            break;

          case "/":
            firstString =
              Number(signFirstString + firstString) /
              Number(signSecondString + secondString);
            firstString = roundingNumber(firstString.toString());
            output.value = signFirstString + firstString;
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

  singNumber.addEventListener(
    "click",
    () => {
      if (firstString == null || firstString == "Error") {
        return;
      }
      if (secondString == null) {
        if (signFirstString == "") {
          signFirstString = "-";
        } else {
          signFirstString = "";
        }
        output.value = signFirstString + firstString;
      } else {
        if (signSecondString == "") {
          signSecondString = "-";
        } else {
          signSecondString = "";
        }
        output.value = signSecondString + secondString;
      }
    },
    false
  );

  arrayOfOperations.forEach((item) => {
    function handlerOperation() {
      if (firstStringIsWrite && secondString != null) {
        switch (sign) {
          case "+":
            firstString =
              Number(signFirstString + firstString) +
              Number(signSecondString + secondString);
            firstString = roundingNumber(firstString.toString());
            output.value = signFirstString + firstString;
            sign = "+";
            secondString = null;
            break;

          case "-":
            firstString =
              Number(signFirstString + firstString) -
              Number(signSecondString + secondString);
            firstString = roundingNumber(firstString.toString());
            output.value = signFirstString + firstString;
            sign = "-";
            secondString = null;
            break;

          case "*":
            firstString =
              Number(signFirstString + firstString) *
              Number(signSecondString + secondString);
            firstString = roundingNumber(firstString.toString());
            output.value = signFirstString + firstString;
            sign = "*";
            secondString = null;
            break;

          case "/":
            firstString =
              Number(signFirstString + firstString) /
              Number(signSecondString + secondString);
            firstString = roundingNumber(firstString.toString());
            output.value = signFirstString + firstString;
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
  });*/
};
