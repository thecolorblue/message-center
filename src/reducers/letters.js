const letter = (state, action) => {
  switch (action.type) {
    case 'ADD_LETTER':
      return Object.assign({
        id: action.id,
        selected: false
      }, action);
    case 'TOGGLE_LETTER':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        selected: !state.selected
      })
    default:
      return state
  }
}

const letters = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LETTER':
      return state.concat([
        letter(undefined, action)
      ])
    case 'TOGGLE_LETTER':
      return state.map(l => letter(l, action))
    default:
      return state
  }
}

export default letters