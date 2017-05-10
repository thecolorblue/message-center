import { combineReducers } from 'redux'
import letters from './letters.js'
import visibilityFilter from './visibilityFilter.js'

const letterApp = combineReducers({
  letters,
  visibilityFilter
})

export default letterApp