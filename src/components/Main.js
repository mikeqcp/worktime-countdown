import React from 'react';
import LinesGraph from './Graph/Lines/Graph';
import PixelsGraph from './Graph/Pixels/Pixels';
import moment from 'moment';

import {GRAPH_LINES, PIXELS, NONE} from '../components/Graph/types';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: this.props.progress,
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
    const newTimeRange = this.updateTimeRange(props.hours);
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
    this.props.setProgress(diff / daySeconds);
  }

  displayPercentage() {
    return parseFloat(this.props.progress * 100).toFixed(2);
  }

  displayTimeLeft() {
    const timeLeft = moment.duration(this.state.endTime - moment());
    return `${timeLeft.hours()}h ${timeLeft.minutes()}min left`;
  }

  renderGraph() {
    switch (this.props.graph) {
      case NONE:
        return null;
      case GRAPH_LINES:
        return <LinesGraph/>;
      case PIXELS:
        return <PixelsGraph/>;
    }
  }

  render() {
    return (
      <section>
        { this.renderGraph() }
        <div className="info">
          <h1 className="percentage">{this.displayPercentage()}%</h1>
          <h2>{this.displayTimeLeft()}</h2>
        </div>
      </section>
    );
  }
}

export default AppComponent;
