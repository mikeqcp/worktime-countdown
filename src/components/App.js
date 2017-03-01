import React, {Component} from 'react'
import {Router, Route, browserHistory} from 'react-router'

import Home from '../containers/Home';
import Main from '../containers/Main';

export default class extends Component {
  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <Route path="/" component={Home}/>
          <Route path="/track" component={Main}/>
        </Router>
      </div>
    )
  }
}
