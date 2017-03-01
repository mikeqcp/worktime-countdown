import React, {Component} from 'react'
import {browserHistory} from 'react-router';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromHours: this.props.hours.from[0],
      fromMins: this.props.hours.from[1],
      toHours: this.props.hours.to[0],
      toMins: this.props.hours.to[1],
    };

    this.proceed = this.proceed.bind(this);
    this.onFormUpdated = this.onFormUpdated.bind(this);
  }

  onFormUpdated(ev) {
    this.setState({[ev.target.name]: parseInt(ev.target.value, 10)});
  }

  proceed() {
    const {fromHours, fromMins, toHours, toMins} = this.state;
    this.props.setHours({
      from: [fromHours, fromMins],
      to: [toHours, toMins]
    });
    browserHistory.push('/track');
  }

  render() {
    return (
      <div className="hours-select">
        <h2 className="hours-select__title">Your working hours:</h2>

        <input type="number" name="fromHours" value={this.state.fromHours} onChange={this.onFormUpdated}/>
        <input type="number" name="fromMins" value={this.state.fromMins} onChange={this.onFormUpdated}/>

        <input type="number" name="toHours" value={this.state.toHours} onChange={this.onFormUpdated}/>
        <input type="number" name="toMins" value={this.state.toMins} onChange={this.onFormUpdated}/>

        <button onClick={this.proceed}>OK</button>
      </div>
    )
  }
}
