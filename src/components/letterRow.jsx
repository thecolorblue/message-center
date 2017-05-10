import React from 'react';
import ReactDOM from 'react-dom';
import DOMPurify from 'dompurify'
import moment from 'moment' 

class LetterRow extends React.Component {
  render() {
    var letter = this.props.letter;
    var message = (letter.html || letter.text || '').split('\n')[0];
    
    
    return (<tr>
      <td className="mdl-data-table__cell--non-numeric title">{ letter.title }</td>
      <td className="subject">{ letter.subject }</td>
      <td className="from">{ letter.from }</td>
      <td className="to">{ letter.to }</td>
      <td className="to">{ moment(letter.received_at || letter.receieved_at).fromNow() }</td>
      <td className="body" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(message)}}></td>
    </tr>)
  }
}

module.exports = LetterRow;