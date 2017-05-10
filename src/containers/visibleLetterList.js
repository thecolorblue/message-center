import { connect } from 'react-redux'
import { toggleLetter } from '../actions/index.js'
import LetterList from '../components/letterList.jsx'

const getVisibleLetters = (letters, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return letters
    case 'SHOW_SENT':
      return letters.filter(t => t.sent)
    case 'SHOW_SUPPORT':
      return letters.filter(t => !t.to === 'support@ploughmens')
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  letters: getVisibleLetters(state.letters, state.visibilityFilter)
})

const mapDispatchToProps = {
  onLetterClick: toggleLetter
}

const VisibleLetterList = connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterList)

export default VisibleLetterList