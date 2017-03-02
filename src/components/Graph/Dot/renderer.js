import {
  select,
  easeLinear as easing,
  scaleLinear,
  arc
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
    const diagonal = Math.sqrt(this.size.width ** 2 + this.size.height ** 2);
    const rad = scaleLinear().domain([0,1]).range([0, .5 * diagonal])

    const dotGenerator = d => {
      return arc()
      .innerRadius(0)
      .outerRadius(rad(d))
      .startAngle(0)
      .endAngle(2 * Math.PI);
    };

    const dot = this.svg.selectAll('.dot').data([progress]);
    const dotEntered = dot.enter().append('g').attr('class', 'dot');

    dotEntered
    .append('path')
    .attr('transform', `translate(${x(.5)}, ${y(.5)})`)
    .attr('fill', 'darkseagreen')
    .attr('d', d => dotGenerator(d)());

    dot
    .merge(dotEntered)
    .select('path')
    .attr('transform', `translate(${x(.5)}, ${y(.5)})`)
    .transition()
    .ease(easing)
    .duration(1000)
    .attr('d', d => dotGenerator(d)());
  }
}
