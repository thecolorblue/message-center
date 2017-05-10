import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DOMPurify from 'dompurify'

const Letter = (letter) => (
  <tr onClick={letter.onClick} style={{
      backgroundColor: letter.selected ? '#93c7f2' : ''
    }}>
      <td className="mdl-data-table__cell--non-numeric title">{ letter.title }</td>
      <td className="subject">{ letter.subject }</td>
      <td className="from">{ letter.from }</td>
      <td className="to">{ letter.to }</td>
      <td className="to">{ moment(letter.received_at || letter.receieved_at).fromNow() }</td>
      <td className="body" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize((letter.html || letter.text || '').split('\n')[0])}}></td>
    </tr>
)

Letter.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired
}

export default Letter