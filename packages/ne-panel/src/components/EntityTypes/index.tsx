import * as React from 'react';
import { entityTypes, entityColors } from '../../helpers';
import { Typography, Row, Col } from 'antd';

export const EntityTypes: React.FC<{}> = ({}) => {
  return (
    <React.Fragment>
      {entityTypes.map(n => (
        <Row key={n.key}>
          <Col span={7}>
            <Typography.Text style={{ backgroundColor: entityColors[n.key], marginRight: '1em' }}>
              {n.key}
            </Typography.Text>
          </Col>
          <Col span={17}>
            <Typography.Text>{n.text}</Typography.Text>
          </Col>
        </Row>
      ))}
    </React.Fragment>
  );
};
