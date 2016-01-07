'use strict';

import d3Color from 'd3-color';
import d3Sankey from 'd3-sankey';
import d3Scale from 'd3-scale';
import d3Selection from 'd3-selection';
import d3Format from 'd3-format';
import React from 'react';
import { sprintf } from 'underscore.string';

require('./sankeyDiagram.less');


const SankeyDiagram = React.createClass({
  renderDiagram() {
    const el = this.refs.el;
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    const nodes = this.props.nodes;
    const links = this.props.links;

    const nodeWidth = 15;
    const nodePadding = 10;
    const linkWidth = 200;
    const columns = 4;
    const diagramWidth = (columns - 1) * linkWidth + columns * nodeWidth;
    const diagramHeight = diagramWidth / 1.6;
    const padding = 10;
    const width = diagramWidth + 2 * padding + linkWidth;
    const height = diagramHeight + 2 * padding;

    const formatCurrency = d3Format.localeCsCz.format('$,d');
    const colorScale = d3Scale.category20();

    const svg = d3Selection.select(el).append('svg')
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
      .layout(1024);

    const path = sankey.link();

    const link = svg.append('g').selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', path)
      .style('stroke-width', (d) => d.dy);

    link.append('title')
      .text((d) => sprintf('%s → %s\n%s', d.source.name, d.target.name, formatCurrency(d.value)));

    const node = svg.append('g').selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d) => sprintf('translate(%.0f, %.0f)', d.x, d.y));

    node.append('rect')
      .attr('width', sankey.nodeWidth())
      .attr('height', (d) => d.dy)
      .style('fill', (d) => colorScale(d.name))
      .append('title')
      .text((d) => sprintf('%s\n%s', d.name, formatCurrency(d.value)));

    node.append('text')
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


export default SankeyDiagram;
