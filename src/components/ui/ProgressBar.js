import React from 'react';
import PropTypes from 'prop-types';

import { Progress, Row, Col } from 'antd';

export const ProgressBar = ({ progress, text }) => {
  const { left, total, failed } = progress;

  if (total === 0 || failed === -1) {
    return null;
  }

  const percent = Math.round(((total - left) / total) * 100);
  let status = 'active';
  if (percent === 100) {
    status = failed === 0 ? 'success' : 'active';
  }

  if (text === undefined) {
    return <Progress percent={percent} status={status} />;
  }

  return (
    <Row>
      <Col xs={12}>
        <span>{text}</span>
      </Col>
      <Col xs={12}>
        <Progress percent={percent} status={status} />
      </Col>
    </Row>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.shape({
    total: PropTypes.number,
    left: PropTypes.number,
    failed: PropTypes.number,
  }).isRequired,
  text: PropTypes.string,
};

ProgressBar.defaultProps = {
  text: undefined,
};
