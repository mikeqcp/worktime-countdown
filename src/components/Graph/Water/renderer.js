import {
  select,
  easeLinear,
  scaleLinear,
  area,
  curveCardinal
} from 'd3';
import _ from 'lodash';

export default class GraphRenderer {
  constructor({root, width, height}) {
    this.svg = select(root)
    .append('svg')
    .attr('class', 'graph');

    this.resize({width, height});
  }

  resize({width, height}) {
    this.size = {width, height};

    this.svg
    .attr('width', width)
    .attr('height', height);
  }

  render(progress) {
    const x = scaleLinear().domain([0,1]).range([0, 1.5 * this.size.width]);
    const y = scaleLinear().domain([0,1]).range([this.size.height, 0]);

    const areaGenerator = area()
    .curve(curveCardinal)
    .x(d => x(d[0]))
    .y0(y(0))
    .y1(d => y(d[1]));

    const wave = this.svg.selectAll('.area').data([progress]);
    const waveEntered = wave.enter().append('g').attr('class', 'area');

    const waveHeight = .025;
    const generateWaveData = (progress) => {
      const steps = 14;
      return _.times(steps + 1, i => {
        return [i / steps, i % 2 == 0 ? progress : progress + waveHeight];
      })
    };

    waveEntered
    .append('path')
    .attr('fill', 'darkseagreen')
    .attr('d', () => areaGenerator(generateWaveData(0)));


    wave
    .merge(waveEntered)
    .select('path')
    .transition()
    .ease(easeLinear)
    .duration(1000)
    .attr('d', d => areaGenerator(generateWaveData(d)));
  }
}
