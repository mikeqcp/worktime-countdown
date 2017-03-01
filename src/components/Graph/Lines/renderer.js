import {
  select,
  easeLinear
} from 'd3';
import _ from 'lodash';

const hours = 8;
const linesPerHour = 60;

export default class GraphRenderer {
  constructor({root, width, height}) {
    this.svg = select(root)
    .append('svg')
    .attr('class', 'graph');

    this.resize({width, height});
  }

  resize({width, height}) {
    this.svg
    .attr('width', width)
    .attr('height', height);

    this.linesCount = hours * linesPerHour;
    this.singleLineProgress = 1 / this.linesCount;
    this.lineHeight = height / this.linesCount;
    this.lineWidth = width;
  }

  getData(progress) {
    const currLine = Math.floor(progress / this.singleLineProgress);

    return _.times(this.linesCount, (i) => {
      if (i < currLine) return 1;
      if (i > currLine) return 0;
      return (progress % this.singleLineProgress) / this.singleLineProgress;
    });
  }

  render(progress) {
    const data = this.getData(progress);

    const lines = this.svg.selectAll('.line').data(data);
    const linesEntered = lines.enter().append('g').attr('class', 'line');

    linesEntered
    .append('rect')
    .attr('transform', d => `scale(${d}, 1)`);

    lines
    .merge(linesEntered)
    .attr('transform', (d, i) => `translate(0, ${i * this.lineHeight})`)
    .select('rect')
    .attr('height', Math.ceil(this.lineHeight) + 1)
    .attr('width', this.lineWidth)
    .transition()
    .ease(easeLinear)
    .duration(1000)
    .attr('transform', d => `scale(${d}, 1)`);
  }
}
