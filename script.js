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


};
