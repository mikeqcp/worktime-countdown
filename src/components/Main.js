require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {connect} from 'react-redux';
import Graph from './Graph/Graph';
import moment from 'moment';
import {setHours} from '../actions/hours';

@connect(s => {
  return {hours: s.hours};
}, {setHours})
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: this.getProgress(),
      ...this.updateTimeRange(this.props.hours)
    };

    this.requestFrame = () => {
      this.timeout = setTimeout(() => {
        requestAnimationFrame(() => {
          this.setState({progress: this.getProgress()});
          this.requestFrame();
        });
      }, 1000)
    };

    this.requestFrame();
  }

  componentWillReceiveProps(props) {
    const newTimeRange = this.updateTimeRange(props);
    this.setState(newTimeRange);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  updateTimeRange(hours) {
    const [startHour, startMinutes] = hours.from;
    const [endHour, endMinutes] = hours.to;

    return {
      startTime: moment().hour(startHour).minute(startMinutes).second(0),
      endTime: moment().hour(endHour).minute(endMinutes).second(0)
    };
  }

  getProgress() {
    const daySeconds = moment.duration(this.state.endTime - this.state.startTime).asSeconds();
    const diff = moment.duration(moment() - this.state.startTime).asSeconds();
    return diff / daySeconds;
  }

  displayPercentage() {
    return parseFloat(this.state.progress * 100).toFixed(2);
  }

  displayTimeLeft() {
    const timeLeft = moment.duration(this.state.endTime - moment());
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
