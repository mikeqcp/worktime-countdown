import React, {Component} from 'react'
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {GRAPH_LINES, NONE, PIXELS, WATER, DOT} from './Graph/types';

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
    this.handleGraphChange = this.handleGraphChange.bind(this);
  }

  setStartTime(ev, startTime) {
    const suggestedEndHour = Math.min(24, startTime.getHours() + 8);
    const endTime = new Date(startTime);
    endTime.setHours(suggestedEndHour);

    this.setState({
      startTime,
      endTime
    });
  }

  setEndTime(ev, endTime) {
    this.setState({endTime});
  }

  handleGraphChange(ev, index, type) {
    this.props.setGraphType(type);
  }

  proceed() {
    this.props.setHours({
      from: [this.state.startTime.getHours(), this.state.startTime.getMinutes()],
      to: [this.state.endTime.getHours(), this.state.endTime.getMinutes()]
    });

    ga('send', 'pageview', '/track');
    ga('send', 'event', 'select', 'graph-selected', this.props.graph);

    browserHistory.push('/track');
  }

  render() {
    return (
      <div className="hours-select">
        <h2 className="hours-select__title">Your working hours:</h2>

        <div className="hours-select__pickers">
          <TimePicker
            className="hours-select__picker"
            format="24hr"
            hintText="Start time"
            value={this.state.startTime}
            onChange={this.setStartTime}
          />

          <span> - </span>

          <TimePicker
            className="hours-select__picker"
            format="24hr"
            hintText="End time"
            value={this.state.endTime}
            onChange={this.setEndTime}
          />
        </div>

        <h2>Visualisation type:</h2>

        <SelectField
          className="hours-select__type"
          floatingLabelText="Visualisation type"
          value={this.props.graph}
          onChange={this.handleGraphChange}
        >
          <MenuItem value={NONE} primaryText="Text only" />
          <MenuItem value={GRAPH_LINES} primaryText="Lines" />
          <MenuItem value={PIXELS} primaryText="Pixels" />
          <MenuItem value={WATER} primaryText="Water" />
          <MenuItem value={DOT} primaryText="Dot" />
        </SelectField>

        <div>
          <RaisedButton className="hours-select__btn" onClick={this.proceed} label="OK"/>
        </div>
      </div>
    )
  }
}
