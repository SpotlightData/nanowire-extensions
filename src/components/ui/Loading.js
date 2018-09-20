import React from 'react';
import PropTypes from 'prop-types';

import { Spin } from 'antd';

const defaultStyle = {
	pointerEvents: 'none',
};

export const Loading = ({ className, style = defaultStyle }) => (
	<div className={className} style={style}>
		<Spin size="large" />
	</div>
);

Loading.propTypes = {
	className: PropTypes.string,
};

Loading.defaultProps = {
	className: 'loading-spinner',
};

Loading.displayName = 'Loading';
