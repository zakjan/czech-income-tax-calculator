'use strict';

import d3Color from 'd3-color';
import d3Sankey from 'd3-sankey';
import d3Scale from 'd3-scale';
import d3Selection from 'd3-selection';
import d3Format from 'd3-format';
import React from 'react';

require('./sankeyDiagram.less');


var SankeyDiagram = React.createClass({
  renderContent(el) {
    var nodes = this.props.nodes;
    var links = this.props.links;
    var width = 600;
    var height = 400;
    var padding = 10;

    var locale = d3Format.locale({
      decimal: ',',
      thousands: '\xa0',
      grouping: [3],
      currency: ['', '\xa0Kč'],
    });
    var format = (value) => locale.format('$,d')(value);
    var color = d3Scale.category20();

    var svg = d3Selection.select(el).append('svg')
      .attr('class', 'sankey-diagram')
      .attr('width', width + 2 * padding + 200)
      .attr('height', height + 2 * padding)
      .append('g')
      .attr('transform', 'translate(' + padding + ',' + padding + ')');

    var sankey = d3Sankey.sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .size([width, height]);

    sankey
      .nodes(nodes)
      .links(links)
      .layout(32);

    var path = sankey.link();

    var link = svg.append('g').selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', path)
      .style('stroke-width', (d) => Math.max(1, d.dy))
      .sort((a, b) => b.dy - a.dy);

    link.append('title')
      .text((d) => d.source.name + ' → ' + d.target.name + '\n' + format(d.value));

    var node = svg.append('g').selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');

    node.append('rect')
      .attr('height', (d) => d.dy)
      .attr('width', sankey.nodeWidth())
      .style('fill', (d) => color(d.name))
      .append('title')
      .text((d) => d.name + '\n' + format(d.value));

    node.append('text')
      .attr('x', 6 + sankey.nodeWidth())
      .attr('y', (d) => d.dy / 2)
      .attr('dy', '.35em')
      .text((d) => d.name + ': ' + format(d.value));
  },

  render() {
    return (
      <div ref={this.renderContent} />
    );
  },
});


export default SankeyDiagram;
