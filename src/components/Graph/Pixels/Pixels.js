import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

@connect(s => {return {progress: s.progress};}, {})
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getSize();
    this.previousIndex = 0;
  }

  componentDidMount() {
    this.onResize = () => {
      this.initCanvas();
      this.setState(this.getSize);
    };
    window.addEventListener('resize', this.onResize);

    this.ctx = this.canvas.getContext('2d');
    this.initCanvas();
    this.updateCanvas(true);
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

  updateCanvas(allGreen = false) {
    const currPixel = Math.floor(this.pixels.length * this.props.progress);

    if (allGreen) {
      this.previousIndex = currPixel;
    }

    this.ctx.clearRect(0, 0, this.state.width, this.state.height);

    const canvasData = this.ctx.getImageData(0, 0, this.state.width, this.state.height);

    for(let i = 0; i < this.previousIndex; i++) {
      this.drawPixel(canvasData, i, [143, 188, 143]);
    }

    this.ctx.putImageData(canvasData, 0, 0);

    this.ctx.fillStyle = 'red';
    for(let i = this.previousIndex; i < currPixel; i ++) {
      const posIndex = this.pixels[i];
      const x = Math.floor(posIndex % this.state.width);
      const y = Math.floor(posIndex / this.state.width);

      this.ctx.fillRect(x - 1, y - 1, 3, 3);
    }

    this.previousIndex = currPixel;
  }

  drawPixel(canvasData, i, [red, green, blue]) {
    const index = 4 * this.pixels[i];

    canvasData.data[index] = red;
    canvasData.data[index + 1] = green;
    canvasData.data[index + 2] = blue;
    canvasData.data[index + 3] = 255;
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
