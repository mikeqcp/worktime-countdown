import React from 'react';
import GraphRenderer from './renderer';

export default class Graph extends React.Component {
  componentDidMount() {
    this.graphRenderer = new GraphRenderer({
      root: this.root,
      width: window.innerWidth,
      height: window.innerHeight
    });

    this.graphRenderer.render(this.props.progress);
  }

  componentWillReceiveProps(props) {
    const progress = Math.max(0, Math.min(1, props.progress));
    this.graphRenderer.render(progress);
  }

  render() {
    return <dev className="root" ref={(root) => { this.root = root; }}/>;
  }
}
