import React from 'react';
import ReactDOM from 'react-dom';

import Row from './components/letterRow.jsx';

import Footer from './components/footer.jsx'
import AddLetter from './containers/addLetter'
import VisibleLetterList from './containers/visibleLetterList'

export default App

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { letters: [] };
  }
  
  render () {
  return (<div>
    <Footer />
    <VisibleLetterList />
  </div>);
    
    // return (<table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
    //   <thead>
    //     <tr>
    //       <th className="mdl-data-table__cell--non-numeric">title</th>
    //       <th className="mdl-data-table__cell--non-numeric">from</th>
    //       <th className="mdl-data-table__cell--non-numeric">to</th>
    //       <th className="mdl-data-table__cell--non-numeric">created</th>
    //       <th className="mdl-data-table__cell--non-numeric">html</th>
    //     </tr>
    //   </thead>
    //   <tbody className="post-container">
    //     {this.state.letters.map((l, i)=> <Row letter={l} key={i}></Row>)}
    //   </tbody>
    // </table>);
  }
};

module.exports = App;