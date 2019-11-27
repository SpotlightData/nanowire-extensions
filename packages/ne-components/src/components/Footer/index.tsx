import * as React from 'react';
import { Layout, Row, Col } from 'antd';

interface FooterProps {
  version: string;
  className: string;
  privacyUrl: string;
}

export const Footer: React.FC<FooterProps> = ({ version, className, privacyUrl }) => {
  return (
    <Layout.Footer className={className}>
      <Row>
        <Col span={6} />
        <Col span={12} style={{ textAlign: 'center' }}>
          Nanowire panel v{version} ©{new Date().getFullYear()} Created by Spotlight Data
        </Col>
        <Col span={6}>
          <a href={privacyUrl} target="_blank" className="right-floated">
            Privacy Policy
          </a>
        </Col>
      </Row>
    </Layout.Footer>
  );
};
