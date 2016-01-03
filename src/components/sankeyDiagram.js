'use strict';

import d3Color from 'd3-color';
import d3Sankey from 'd3-sankey';
import d3Scale from 'd3-scale';
import d3Selection from 'd3-selection';
import d3Format from 'd3-format';
import React from 'react';
import { sprintf } from 'underscore.string';

require('./sankeyDiagram.less');


var format = d3Format.localeCsCz.format('$,d');

var SankeyDiagram = React.createClass({
  renderContent(el) {
    var nodes = this.props.nodes;
    var links = this.props.links;

    var nodeWidth = 15;
    var nodePadding = 10;
    var linkWidth = 200;
    var columns = 3;
    var diagramWidth = (columns - 1) * linkWidth + columns * nodeWidth;
    var diagramHeight = diagramWidth / 1.6;
    var padding = 10;
    var width = diagramWidth + 2 * padding + linkWidth;
    var height = diagramHeight + 2 * padding;

    var colorScale = d3Scale.category20();

    var svg = d3Selection.select(el).append('svg')
      .attr('class', 'sankey-diagram')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', sprintf('translate(%d, %d)', padding, padding));

    var sankey = d3Sankey.sankey()
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .size([diagramWidth, diagramHeight]);

    sankey
      .nodes(nodes)
      .links(links)
      .layout(32);

    var link = svg.append('g').selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', sankey.link())
      .style('stroke-width', (d) => d.dy);

    link.append('title')
      .text((d) => sprintf('%s → %s\n%s', d.source.name, d.target.name, format(d.value)));

    var node = svg.append('g').selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d) => sprintf('translate(%.0f, %.0f)', d.x, d.y));

    node.append('rect')
      .attr('width', sankey.nodeWidth())
      .attr('height', (d) => d.dy)
      .style('fill', (d) => colorScale(d.name))
      .append('title')
      .text((d) => sprintf('%s\n%s', d.name, format(d.value)));

    node.append('text')
      .attr('x', 6 + sankey.nodeWidth())
      .attr('y', (d) => d.dy / 2)
      .attr('dy', '.35em')
      .text((d) => sprintf('%s: %s', d.name, format(d.value)));
  },

  render() {
    return (
      <div ref={this.renderContent} />
    );
  },
});


export default SankeyDiagram;
