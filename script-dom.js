{
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

  const display = document.getElementById("numbers");
  const arrayNumber = [zero, one, two, three, four, five, six, seven, eight, nine];
  const arrayOfOperations = [add, sub, mul, div];

  const updateDisplay = (state) => {
    if (state.result !== null) {
      if (isNaN(state.result) || state.result === Infinity) {
        display.textContent = "Error";
        return;
      }

      if (state.result >= MAX_NUMBER || state.result <= -MAX_NUMBER) {
        display.textContent = state.result.toExponential(MAX_DEGREE);
        return;
      }

      display.textContent = +state.result.toFixed(MAX_DEGREE);
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
}

document.addEventListener("keydown", (event) => {
  const action = getActionFromNumpad(event.code);
  console.log(event.code);
  if (action) {
    store.dispatch(action);
  }
});

function getActionFromNumpad(code) {
  switch (code) {
    case "Numpad0":
    case "Numpad1":
    case "Numpad2":
    case "Numpad3":
    case "Numpad4":
    case "Numpad5":
    case "Numpad6":
    case "Numpad7":
    case "Numpad8":
    case "Numpad9":
    case "Digit0":
    case "Digit1":
    case "Digit2":
    case "Digit3":
    case "Digit4":
    case "Digit5":
    case "Digit6":
    case "Digit7":
    case "Digit8":
    case "Digit9":
      return {
        type: `id_${code.substr(-1, 1)}`,
        payload: { number: `id_${code.substr(-1, 1)}`, result: store.getState().result },
      };

    case "NumpadDivide":
      return { type: "id_/" };

    case "NumpadMultiply":
      return { type: "id_*" };

    case "NumpadSubtract":
    case "Minus":
      return { type: "id_-" };

    case "NumpadAdd":
      return { type: "id_+" };

    case "NumpadEnter":
    case "Enter":
    case "Equal":
      return { type: "id_=", payload: store.getState().array };

    case "NumpadDecimal":
      return { type: "id_." };

    case "Backspace":
      return { type: "id_backspace" };

    default:
      return null;
  }
}
