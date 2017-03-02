import React from 'react';
import LinesGraph from './Graph/Lines/Graph';
import PixelsGraph from './Graph/Pixels/Pixels';
import WaterProgress from './Graph/Water/Water';
import DotProgress from './Graph/Dot/Dot';
import moment from 'moment';

import {GRAPH_LINES, PIXELS, NONE, WATER, DOT} from '../components/Graph/types';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    const times = this.updateTimeRange(this.props.hours);
    this.props.setProgress(this.getProgress(times));
    this.state = {
      ...times
    };

    this.requestFrame = () => {
      this.timeout = setTimeout(() => {
        requestAnimationFrame(() => {
          this.props.setProgress(this.getProgress());
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

  getProgress(times = this.state) {
    const daySeconds = moment.duration(times.endTime - times.startTime).asSeconds();
    const diff = moment.duration(moment() - times.startTime).asSeconds();
    return diff / daySeconds;
  }

  displayPercentage() {
    return parseFloat(Math.min(this.props.progress, 1) * 100).toFixed(2);
  }

  displayTimeLeft() {
    const timeLeft = moment.duration(this.state.endTime - moment());

    let minutes = timeLeft.minutes();
    minutes = (minutes === 0 && timeLeft.seconds() > 0) ? 1 : minutes;

    const overTime = this.state.endTime < moment();
    return (
      <h2 className={overTime ? 'info__title--overtime' : ''}>
        {Math.abs(timeLeft.hours())}h {Math.abs(minutes)}min {overTime ? 'overtime' : 'left'}
      </h2>
    );
  }

  renderGraph() {
    const graphsMap = {
      [NONE]: null,
      [GRAPH_LINES]: <LinesGraph/>,
      [PIXELS]: <PixelsGraph/>,
      [WATER]: <WaterProgress/>,
      [DOT]: <DotProgress/>
    };

    return graphsMap[this.props.graph];
  }

  render() {
    return (
      <section>
        { this.renderGraph() }
        <div className="info">
          <h1 className="percentage">{this.displayPercentage()}%</h1>
          {this.displayTimeLeft()}
        </div>
      </section>
    );
  }
}

export default AppComponent;
