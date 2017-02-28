require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Graph from './Graph/Graph';
import moment from 'moment';

const startHour = 9;
const endHour = 17;
const daySeconds = (endHour - startHour) * 60 * 60;

function getProgress() {
  const diff = moment.duration(moment() - moment().hour(startHour).minute(0).second(0)).asSeconds();
  return diff / daySeconds;
}

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: getProgress()
    };

    this.requestFrame = () => {
      this.timeout = setTimeout(() => {
        requestAnimationFrame(() => {
          this.setState({progress: getProgress()});
          this.requestFrame();
        });
      }, 1000)
    };

    this.requestFrame();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  displayPercentage() {
    return parseFloat(this.state.progress * 100).toFixed(2);
  }

  displayTimeLeft() {
    const timeLeft = moment.duration(moment().hour(endHour).minute(0).second(0) - moment());
    return `${timeLeft.hours()}h ${timeLeft.minutes()}min left`;
  }

  render() {
    return (
      <section>
        <Graph progress={this.state.progress}/>
        <div className="info">
          <h1 className="percentage">{this.displayPercentage()}%</h1>
          <h2>{this.displayTimeLeft()}</h2>
        </div>
      </section>
    );
  }
}

export default AppComponent;
