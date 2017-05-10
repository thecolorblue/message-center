let nextLetterId = 0
export const addLetter = (letter) => Object.assign({
  type: 'ADD_LETTER',
  id: nextLetterId++,
}, letter)

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleLetter = (id) => ({
  type: 'TOGGLE_LETTER',
  id
})