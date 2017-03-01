import React, {Component} from 'react'
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';

export default class extends Component {
  constructor(props) {
    super(props);
    const startTime = new Date();
    startTime.setHours(this.props.hours.from[0]);
    startTime.setMinutes(this.props.hours.from[1]);

    const endTime = new Date();
    endTime.setHours(this.props.hours.to[0]);
    endTime.setMinutes(this.props.hours.to[1]);

    this.state = {
      startTime,
      endTime
    };

    this.proceed = this.proceed.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
  }

  setStartTime(ev, startTime) {
    this.setState({startTime});
  }

  setEndTime(ev, endTime) {
    this.setState({endTime});
  }

  proceed() {
    this.props.setHours({
      from: [this.state.startTime.getHours(), this.state.startTime.getMinutes()],
      to: [this.state.endTime.getHours(), this.state.endTime.getMinutes()]
    });
    browserHistory.push('/track');
  }

  render() {
    return (
      <div className="hours-select">
        <h2 className="hours-select__title">Your working hours:</h2>

        <TimePicker
          format="24hr"
          hintText="Start time"
          value={this.state.startTime}
          onChange={this.setEndTime}
        />

        <span> - </span>

        <TimePicker
          format="24hr"
          hintText="End time"
          value={this.state.endTime}
          onChange={this.setEndTime}
        />

        <RaisedButton className="hours-select__btn" onClick={this.proceed} label="OK"/>
      </div>
    )
  }
}
