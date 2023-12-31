import * as d3Sankey from 'd3-sankey';
import * as d3Selection from 'd3-selection';
import React from 'react';
import PropTypes from 'prop-types';

import formatCurrency from 'services/formatCurrency.js';
import './sankeyDiagram.less';


class SankeyDiagram extends React.Component {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  clearDiagram() {
    while (this.element.current.firstChild) {
      this.element.current.removeChild(this.element.current.firstChild);
    }
  }

  renderDiagram() {
    this.clearDiagram();

    const nodeWidth = 15;
    const nodePadding = 10;
    const linkWidth = 300;
    const columns = 4;
    const diagramWidth = (columns - 1) * linkWidth + columns * nodeWidth;
    const diagramHeight = diagramWidth / 4;
    const padding = 10;
    const width = diagramWidth + 2 * padding + linkWidth;
    const height = diagramHeight + 2 * padding;

    const svg = d3Selection.select(this.element.current).append('svg')
      .attr('class', 'sankey-diagram')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${padding}, ${padding})`);

    // hide links with zero value
    const nonzeroNodes = this.props.nodes.filter(node => this.props.links.some(link => (link.source === node.id || link.target === node.id) && link.value > 0));
    const nonzeroLinks = this.props.links.filter(link => link.value > 0);
    if (nonzeroNodes.length === 0) {
      return;
    }

    const sankey = d3Sankey.sankey()
      .nodeId(d => d.id)
      .size([diagramWidth, diagramHeight])
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding);

    const { nodes, links } = sankey({
      nodes: nonzeroNodes,
      links: nonzeroLinks,
    });

    const totalValue = nodes[0].value;

    const link = svg.append('g').selectAll('.link')
      .data(links)
      .join('path')
      .attr('class', 'link')
      .attr('d', d3Sankey.sankeyLinkHorizontal())
      .style('stroke-width', d => Math.max(1, d.width));

    const node = svg.append('g').selectAll('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x0}, ${d.y0})`);

    node
      .append('rect')
      .attr('width', sankey.nodeWidth())
      .attr('height', d => Math.max(1, d.y1 - d.y0))
      .attr('transform', d => d.y1 - d.y0 < 0.5 ? 'translate(0, -0.5)' : '')
      .style('fill', d => d.color || '#eeeeee');

    node
      .filter(d => d.value > 0)
      .append('text')
      .attr('x', 6 + sankey.nodeWidth())
      .attr('y', d => (d.y1 - d.y0) / 2)
      .text(d => d.name ? `${d.name}: ${formatCurrency(Math.round(d.value))} (${Math.round(d.value / totalValue * 100)} %)` : '');
  }

  componentDidMount() {
    this.renderDiagram();
  }

  componentDidUpdate() {
    this.renderDiagram();
  }

  render() {
    return (
      <div ref={this.element} />
    );
  }
}

SankeyDiagram.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
  })).isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    source: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
};


export default SankeyDiagram;
