// mutating redux state causes my components to not rerender...
// this is a recursive deep clone so I will never have to deal with mutated state objects
// thanks StackOverflow
export function cloneState(state) {
  if (typeof state !== "object" || state === null) {
    return state;
  }

  const newState = {};

  for (const key in state) {
    if (Object.hasOwnProperty.call(state, key)) {
      const value = state[key];
      let newValue;

      if (Array.isArray(value)) {
        newValue = [];

        for (const item of value) {
          newValue.push(cloneState(item));
        }
      } else if (typeof value === "object") {
        newValue = cloneState(value);
      } else {
        newValue = value;
      }

      newState[key] = newValue;
    }
  }

  return newState;
}
