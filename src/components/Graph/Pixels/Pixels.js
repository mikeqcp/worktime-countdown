import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

@connect(s => {return {progress: s.progress};}, {})
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getSize();
  }

  componentDidMount() {
    this.onResize = () => {
      this.initCanvas();
      this.setState(this.getSize);
    };
    window.addEventListener('resize', this.onResize);

    this.ctx = this.canvas.getContext('2d');
    this.initCanvas();
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  initCanvas() {
    const pixelsCount = this.state.width * this.state.height;
    this.pixels = _.shuffle(_.times(pixelsCount, i => i));
    this.ctx.clearRect(0, 0, this.state.width, this.state.height);
  }

  updateCanvas() {
    const currPixel = this.pixels.length * this.props.progress;

    const canvasData = this.ctx.getImageData(0, 0, this.state.width, this.state.height);

    for(let i = 0; i < currPixel; i++) {
      const index = 4 * this.pixels[i];

      canvasData.data[index] = 143;
      canvasData.data[index + 1] = 188;
      canvasData.data[index + 2] = 143;
      canvasData.data[index + 3] = 255;
    }

    this.ctx.putImageData(canvasData, 0, 0);
  }

  getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  render() {
    return <canvas className="pixels"
                   width={this.state.width}
                   height={this.state.height}
                   ref={canvas => this.canvas = canvas}/>
  }
}
