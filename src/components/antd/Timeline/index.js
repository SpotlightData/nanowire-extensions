import React from 'react';
import PropTypes from 'prop-types';

import { Timeline as AntTimeline } from 'antd';

import sid from 'shortid';

const createLine = accessor => entry => (
  <AntTimeline.Item key={sid.generate()}>{accessor(entry)}</AntTimeline.Item>
);

export const Timeline = ({ items, accessor }) => (
  <AntTimeline>
    {items.map(createLine(typeof accessor === 'string' ? a => a[accessor] : accessor))}
  </AntTimeline>
);

Timeline.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

Timeline.defaultProps = {
  items: [],
  accessor: 'title',
};

Timeline.displayName = 'Timeline';
