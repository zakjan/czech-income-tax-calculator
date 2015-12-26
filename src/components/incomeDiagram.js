'use strict';

import d3Color from 'd3-color';
import d3Sankey from 'd3-sankey';
import d3Scale from 'd3-scale';
import d3Selection from 'd3-selection';
import d3Format from 'd3-format';
import React from 'react';

require('./incomeDiagram.less');


var IncomeDiagram = React.createClass({
  renderContent(el) {
    var nodes = [
      { name: 'Hrubý příjem' },
      { name: 'Čistý příjem' },
      { name: 'Zisk' },
      { name: 'Daň z příjmu' },
      { name: 'Sociální pojištění' },
      { name: 'Zdravotní pojištění' },
    ];
    var links = [
      { source: 0, target: 1, value: 972000 },
      { source: 0, target: 2, value: 648000 },
      { source: 2, target: 3, value: 72360 },
      { source: 2, target: 4, value: 94608 },
      { source: 2, target: 5, value: 43740 },
      { source: 2, target: 1, value: 437292 },
    ];
    var width = 600;
    var height = 400;
    var padding = 10;

    var svg = d3Selection.select(el).append('svg')
      .attr('width', width + 2 * padding)
      .attr('height', height + 2 * padding)
      .append('g')
      .attr('transform', 'translate(' + padding + ',' + padding + ')');

    var locale = d3Format.locale({
      decimal: ',',
      thousands: '\xa0',
      grouping: [3],
      currency: ['', '\xa0Kč'],
    });
    var format = (value) => locale.format('$,d')(value);

    var color = d3Scale.category20();

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
      .style('stroke-width', function(d) {
        return Math.max(1, d.dy);
      })
      .sort(function(a, b) {
        return b.dy - a.dy;
      });

    link.append('title')
      .text(function(d) {
        return d.source.name + ' → ' + d.target.name + '\n' + format(d.value);
      });

    var node = svg.append('g').selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });

    node.append('rect')
      .attr('height', function(d) {
        return d.dy;
      })
      .attr('width', sankey.nodeWidth())
      .style('fill', function(d) {
        return d.color = color(d.name.replace(/ .*/, ''));
      })
      .style('stroke', function(d) {
        return d3Color.rgb(d.color).darker(2);
      })
      .append('title')
      .text(function(d) {
        return d.name + '\n' + format(d.value);
      });

    node.append('text')
      .attr('x', -6)
      .attr('y', function(d) {
        return d.dy / 2;
      })
      .attr('dy', '.35em')
      .attr('text-anchor', 'end')
      .attr('transform', null)
      .text(function(d) {
        return d.name;
      })
      .filter(function(d) {
        return d.x < width / 2;
      })
      .attr('x', 6 + sankey.nodeWidth())
      .attr('text-anchor', 'start');
  },

  render() {
    return (
      <div ref={this.renderContent} />
    );
  },
});


export default IncomeDiagram;
