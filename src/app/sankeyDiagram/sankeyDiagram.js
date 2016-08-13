import d3Sankey from 'd3-sankey';
import * as d3Scale from 'd3-scale';
import * as d3Selection from 'd3-selection';
import * as d3Format from 'd3-format';
import d3FormatCsCzLocale from 'd3-format/locale/cs-CZ.json';
import React from 'react';
import {sprintf} from 'sprintf-js';

import './sankeyDiagram.less';


const SankeyDiagram = React.createClass({
  clearDiagram() {
    const el = this.refs.el;

    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  },

  renderDiagram() {
    this.clearDiagram();

    const nodes = this.props.nodes;
    const links = this.props.links.map((x) => { x.value = Math.max(x.value, 0.1); return x; });

    const nodeWidth = 15;
    const nodePadding = 10;
    const linkWidth = 200;
    const columns = 4;
    const diagramWidth = (columns - 1) * linkWidth + columns * nodeWidth;
    const diagramHeight = diagramWidth / 4;
    const padding = 10;
    const width = diagramWidth + 2 * padding + linkWidth;
    const height = diagramHeight + 2 * padding;

    d3Format.formatDefaultLocale(d3FormatCsCzLocale);
    const formatCurrency = d3Format.format('$,d');
    const colorScale = d3Scale.scaleOrdinal(d3Scale.schemeCategory20);

    const svg = d3Selection.select(this.refs.el).append('svg')
      .attr('class', 'sankey-diagram')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', sprintf('translate(%d, %d)', padding, padding));

    const sankey = d3Sankey.sankey()
      .size([diagramWidth, diagramHeight])
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .nodes(nodes)
      .links(links)
      .layout(32);

    const path = sankey.link();

    const link = svg.append('g').selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', path)
      .style('stroke-width', (d) => d.dy);

    link
      .append('title')
      .text((d) => sprintf('%s → %s\n%s', d.source.name, d.target.name, formatCurrency(d.value)));

    const node = svg.append('g').selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d) => sprintf('translate(%.0f, %.0f)', d.x, d.y));

    node
      .append('rect')
      .attr('width', sankey.nodeWidth())
      .attr('height', (d) => d.dy)
      .style('fill', (d) => colorScale(d.name))
      .append('title')
      .text((d) => sprintf('%s\n%s', d.name, formatCurrency(d.value)));

    node
      .filter((d) => d.value > 0)
      .append('text')
      .attr('x', 6 + sankey.nodeWidth())
      .attr('y', (d) => d.dy / 2)
      .text((d) => sprintf('%s: %s', d.name, formatCurrency(d.value)));
  },

  componentDidMount() {
    this.renderDiagram();
  },

  componentDidUpdate(prevProps, prevState) {
    this.renderDiagram();
  },

  render() {
    return (
      <div ref="el" />
    );
  },
});

SankeyDiagram.propTypes = {
  nodes: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  })).isRequired,
  links: React.PropTypes.arrayOf(React.PropTypes.shape({
    source: React.PropTypes.number.isRequired,
    target: React.PropTypes.number.isRequired,
    value: React.PropTypes.number.isRequired,
  })).isRequired,
};


export default SankeyDiagram;
