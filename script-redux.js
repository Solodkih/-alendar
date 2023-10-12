{
  let state = {
    result: null,
    array: [[]],
  };
  let listener;

  function dispatch(action) {
    let newState = {
      result: reducerResult(state.result, action),
      array: reducerArray(state.array, action),
    };
    if (newState.array !== state.array || newState.result !== state.result) {
      state = newState;
      console.log(newState);
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

    const arrayNumber = copyState.map((item) => {
      if (!ArrayNotContainDivMulSubAdd(item)) {
        return item.at(-1);
      }
      const newItem = item.reduce((str, item, index) => {
        if (index === 0) {
          str = "";
        }
        str += item;
        return str;
      });
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
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return (() => {
          if (state.at(-1).length === 0) {
            return [[action.payload]];
          }
          if (ArrayNotContainDivMulSubAdd(state.at(-1))) {
            const newState = [...state];
            newState.at(-1).push(action.payload);
            return newState;
          }
          return [...state, [action.payload]];
        })();
      case "*":
      case "+":
      case "-":
      case "/":
        return (() => {
          if (state.at(-1).length === 0) {
            return state;
          }
          if (!ArrayNotContainDivMulSubAdd(state.at(-1))) {
            const newItem = [...state.at(-1)];
            newItem.pop();
            newItem.push(action.type);
            const newState = [...state];
            newState.pop();
            newState.push(newItem);
            return newState;
          }
          return [...state, [action.type]];
        })();

      case "C": {
        return [[]];
      }

      case ".":
        return (() => {
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
        })();

      case "+/-":
        return (() => {
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
        })();

      case "backspace":
        return (() => {
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
        })();

      default:
        return state;
    }
  }
}

function reducerResult(state, action) {
  switch (action.type) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "C":
      return null;
    case "=":
      return result(store.getState().array);
    default:
      return state;
  }
}
