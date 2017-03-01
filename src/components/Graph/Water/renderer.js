import {
  select,
  easeLinear,
  scaleLinear,
  area,
  curveCardinal
} from 'd3';

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
    const x = scaleLinear().domain([0,1]).range([0, this.size.width]);
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
      return [
        [0, progress - waveHeight],
        [.25, progress + waveHeight],
        [.5, progress - waveHeight],
        [.75, progress + waveHeight],
        [1, progress - waveHeight],
      ]
    };

    waveEntered
    .attr('transform', 'translate(0,0)')
    .append('path')
    .attr('fill', 'darkseagreen')
    .attr('d', d => areaGenerator(generateWaveData(0)));

    wave
    .merge(waveEntered)
    .selectAll('path')
    .transition()
    .ease(easeLinear)
    .duration(1000)
    .attr('d', d => areaGenerator(generateWaveData(d)));
  }
}
