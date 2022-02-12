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
  const comma = document.getElementById(",");
  const backspace = document.getElementById("backspace");
  const clear = document.getElementById("C");
  let output = document.getElementById("result");
  let firstString = null;
  let secondString = null;
  let sign = null;
  let firstStringIsWrite = false;
  let arrayNumber = [zero, one, two, three, four, five, six, seven, eight, nine];

  function changeString(string, newSymbol) {
    if (string == null) {
      string = newSymbol;
      output.value = string;
      return string;
    } else {
      string = string + newSymbol;
      output.value = string;
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
      firstNumber = null;
      secondNumber = null;
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
        console.log(firstString);
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
};
