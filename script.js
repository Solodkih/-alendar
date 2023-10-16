window.onload = function () {
  const one = document.getElementById("id_1");
  const two = document.getElementById("id_2");
  const three = document.getElementById("id_3");
  const four = document.getElementById("id_4");
  const five = document.getElementById("id_5");
  const six = document.getElementById("id_6");
  const seven = document.getElementById("id_7");
  const eight = document.getElementById("id_8");
  const nine = document.getElementById("id_9");
  const zero = document.getElementById("id_0");
  const add = document.getElementById("id_+");
  const sub = document.getElementById("id_-");
  const equal = document.getElementById("id_=");
  const mul = document.getElementById("id_*");
  const div = document.getElementById("id_/");
  const point = document.getElementById("id_.");
  const backspace = document.getElementById("id_backspace");
  const clear = document.getElementById("id_C");
  const singNumber = document.getElementById("id_+/-");

  let display = document.getElementById("numbers");
  let arrayNumber = [zero, one, two, three, four, five, six, seven, eight, nine];
  let arrayOfOperations = [add, sub, mul, div];

  const updateDisplay = (state) => {
    if (state.result !== null) {
      if (isNaN(state.result) || state.result === Infinity) {
        display.textContent = "Error";
        return;
      }

      if (state.result >= 9999999999) {
        display.textContent = state.result.toExponential(10);
        return;
      }

      display.textContent = +state.result.toFixed(10);
      return;
    }
    let str = state.array.reduce((acc, item) => {
      item.forEach((subItem) => {
        acc += subItem;
      });
      acc += "\n";
      return acc;
    }, "");

    if (str === "\n") {
      str = "0";
    }

    display.textContent = str;
    display.scrollTop = display.scrollHeight;
  };

  subscribe(updateDisplay);

  arrayNumber.forEach((item) => {
    function handlerChangeString() {
      store.dispatch({
        type: item.id,
        payload: { number: item.id, result: store.getState().result },
      });
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
    store.dispatch({ type: equal.id, payload: store.getState().array });
  });
};
