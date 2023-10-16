{
  let state = {
    result: null,
    array: [[]],
  };
  let listener;

  function dispatch(action) {
    let newState = {
      array: reducerArray(state.array, action),
      result: reducerResult(state.result, action),
    };
    if (newState.array !== state.array || newState.result !== state.result) {
      state = newState;
      listener(store.getState());
    }
  }

  function getState() {
    return state;
  }

  function subscribe(fn) {
    listener = fn;
  }

  window.store = {
    dispatch,
    getState,
    subscribe,
  };
  window.MAX_NUMBER = 9999999999;
  window.MAX_DEGREE = 10;

  function divMulSubAdd(first, symbol, second) {
    switch (symbol) {
      case "*":
        return first * second;

      case "+":
        return first + second;

      case "-":
        return first - second;

      case "/":
        return first / second;

      default:
        return 0;
    }
  }

  function result(state) {
    const copyState = state.map((item) => {
      return item.map((item) => {
        return item;
      });
    });

    if (!ArrayNotContainDivMulSubAdd(copyState.at(-1))) {
      copyState.pop();
    }

    const arrayNumber = copyState.map((item) => {
      if (!ArrayNotContainDivMulSubAdd(item)) {
        return item.at(-1);
      }
      const newItem = item.reduce((str, item, index) => {
        str += item;
        return str;
      }, "");
      return Number(newItem);
    });

    arrayNumber.forEach((item, index, array) => {
      if (item !== "*" && item !== "/") {
        return;
      }
      array[index + 1] = divMulSubAdd(array[index - 1], item, array[index + 1]);
      array[index - 1] = null;
      array[index] = null;
    });

    const arrayNumberWithoutDivMull = arrayNumber.filter((item) => item !== null);

    arrayNumberWithoutDivMull.forEach((item, index, array) => {
      if (item === "+" || item === "-") {
        array[index + 1] = divMulSubAdd(array[index - 1], item, array[index + 1]);
        array[index - 1] = null;
        array[index] = null;
      }
    });

    return arrayNumberWithoutDivMull.at(-1);
  }

  function ArrayNotContainDivMulSubAdd(array) {
    return (
      array.at(-1) !== "*" && array.at(-1) !== "+" && array.at(-1) !== "-" && array.at(-1) !== "/"
    );
  }

  function reducerArray(state, action) {
    switch (action.type) {
      case "id_0":
      case "id_1":
      case "id_2":
      case "id_3":
      case "id_4":
      case "id_5":
      case "id_6":
      case "id_7":
      case "id_8":
      case "id_9": {
        if (state.at(-1).length === 0) {
          return [[action.payload.number.substr(-1, 1)]];
        }
        if (action.payload.result !== null) {
          return [[action.payload.number.substr(-1, 1)]];
        }

        if (ArrayNotContainDivMulSubAdd(state.at(-1))) {
          if (state.at(-1).length > MAX_DEGREE) {
            return state;
          }
          const newState = [...state];
          newState.at(-1).push(action.payload.number.substr(-1, 1));
          return newState;
        }
        return [...state, [action.payload.number.substr(-1, 1)]];
      }
      case "id_*":
      case "id_+":
      case "id_-":
      case "id_/": {
        if (state.at(-1).length === 0) {
          return state;
        }
        if (!ArrayNotContainDivMulSubAdd(state.at(-1))) {
          const newItem = [...state.at(-1)];
          newItem.pop();
          newItem.push(action.type.substr(-1, 1));
          const newState = [...state];
          newState.pop();
          newState.push(newItem);
          return newState;
        }
        return [...state, [action.type.substr(-1, 1)]];
      }

      case "id_C": {
        return [[]];
      }

      case "id_.": {
        if (state.at(-1).length === 0) {
          return state;
        }
        if (!ArrayNotContainDivMulSubAdd(state.at(-1))) {
          return state;
        }
        if (state[state.length - 1].includes(".")) {
          return state;
        }
        const newState = [...state];
        newState.at(-1).push(".");
        return newState;
      }

      case "id_+/-": {
        if (state.at(-1).length === 0) {
          return state;
        }
        if (!ArrayNotContainDivMulSubAdd(state.at(-1))) {
          return state;
        }

        const newState = [...state];

        if (newState.at(-1).at(0) === "-") {
          newState.at(-1).shift();
        } else {
          newState.at(-1).unshift("-");
        }
        return newState;
      }

      case "id_backspace": {
        if (state.at(-1).length !== 0) {
          const newState = [...state];
          newState.at(-1).pop();
          if (newState.length > 1 && newState.at(-1).length === 0) {
            newState.pop();
            return newState;
          }
          return newState;
        }
        return state;
      }

      default:
        return state;
    }
  }
}

function reducerResult(state, action) {
  switch (action.type) {
    case "id_0":
    case "id_1":
    case "id_2":
    case "id_3":
    case "id_4":
    case "id_5":
    case "id_6":
    case "id_7":
    case "id_8":
    case "id_9":
    case "id_C":
    case "id_+/-":
    case "id_.":
    case "id_*":
    case "id_+":
    case "id_-":
    case "id_/":
    case "id_backspace":
      return null;
    case "id_=":
      if (state === null) return result(action.payload);
      return null;
    default:
      return state;
  }
}
