require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Graph from './Graph/Graph';
import moment from 'moment';
import _ from 'lodash';

const startHour = 9;
const endHour = 17;
const daySeconds = (endHour - startHour) * 60 * 60;

function getProgress() {
  const diff = moment.duration(moment() - moment().hour(9).minute(0).second(0)).asSeconds();
  return diff / daySeconds;
}

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: getProgress()
    };

    this.inverval = setInterval(() => {
      this.setState({progress: getProgress()})
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.inverval);
  }

  displayPercentage() {
    return _.round(this.state.progress * 100, 2);
  }

  render() {
    return (
      <section>
        <Graph progress={this.state.progress}/>
        <h1 className="percentage">{this.displayPercentage()}%</h1>
      </section>
    );
  }
}

export default AppComponent;
