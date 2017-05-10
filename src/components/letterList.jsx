import React from 'react'
import PropTypes from 'prop-types'
import Letter from './letter.jsx'

const LetterList = ({ letters, onLetterClick }) => (
  <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
    <thead>
      <tr>
        <th className="mdl-data-table__cell--non-numeric">title</th>
        <th className="mdl-data-table__cell--non-numeric">from</th>
        <th className="mdl-data-table__cell--non-numeric">to</th>
        <th className="mdl-data-table__cell--non-numeric">created</th>
        <th className="mdl-data-table__cell--non-numeric">html</th>
      </tr>
    </thead>
    <tbody className="post-container">
      {letters.map(letter =>
        <Letter
          key={letter.id}
          {...letter}
          onClick={() => onLetterClick(letter.id)}
        />
      )}
    </tbody>
  </table>
)

LetterList.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onLetterClick: PropTypes.func.isRequired
}

export default LetterList