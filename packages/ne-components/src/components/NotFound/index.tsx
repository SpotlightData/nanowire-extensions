import * as React from 'react';
import { Row, Typography, Card, Col } from 'antd';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import { notFoundStyle, NotFoundClasses } from './style';
const { Title, Paragraph } = Typography;

const NotFoundBare: React.FC<{
  classes: NotFoundClasses;
}> = ({ classes }) => {
  return (
    <Card className={classes.root}>
      <Helmet>
        <title>404 NOT FOUND</title>
      </Helmet>
      <Row justify="center">
        <div className={classes.body}>
          <Row justify="center">
            <Title level={1}>404 NOT FOUND</Title>
          </Row>
          <Row justify="center">
            <Paragraph>Resource was not found, make sure the url is correct</Paragraph>
          </Row>
        </div>
      </Row>
    </Card>
  );
};

export const NotFound: React.FC<{}> = React.memo(injectSheet(notFoundStyle)(NotFoundBare));
