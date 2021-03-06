import React from 'react';

export default class extends React.Component {
  componentDidMount() {
    this.graphRenderer = new (this.getRenderer())({
      root: this.root,
      width: window.innerWidth,
      height: window.innerHeight
    });

    this.graphRenderer.render(this.props.progress);

    this.onResize = () => {
      this.graphRenderer.resize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', this.onResize);
  }

  componentWillReceiveProps(props) {
    const progress = Math.max(0, Math.min(1, props.progress));
    this.graphRenderer.render(progress);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    return <dev className="root" ref={(root) => { this.root = root; }}/>;
  }
}
