import * as React from 'react';
import * as R from 'ramda';
import { Row, Typography, Card } from 'antd';
import { isApolloError } from 'apollo-client';
import { GraphQLLoadErrors } from '../../interfaces';
import { GraphQLErrorDisplayClasses, graphqlErrorDisplayStyle } from './style';
import injectSheet from 'react-jss';

const { Title, Paragraph, Text } = Typography;

interface GraphQLErrorDisplayProps {
  errors: GraphQLLoadErrors;
}

interface GraphQLErrorDisplayBareProps extends GraphQLErrorDisplayProps {
  classes: GraphQLErrorDisplayClasses;
}

const GraphQLErrorDisplayBare: React.FC<GraphQLErrorDisplayBareProps> = ({ errors, classes }) => {
  console.error(errors);
  return (
    <Card className={classes.root}>
      <Row type="flex" justify="center">
        <Title level={1} className={classes.title}>
          Page has crashed
        </Title>
      </Row>
      <Row type="flex" justify="center" className={classes.notice}>
        <Text>Please report the issue to info@spotlightdata.co.uk</Text>
      </Row>
      {errors.map((error, i) => {
        let string: string;
        if (isApolloError(error)) {
          string = JSON.stringify(
            R.pathOr({ stack: error.stack }, ['networkError', 'result', 'errors'], error)
          );
        } else {
          string = JSON.stringify(error, null, 2);
        }
        return (
          <Row type="flex" justify="center" key={i}>
            <div className={classes.code}>
              <code>{string}</code>
            </div>
          </Row>
        );
      })}
    </Card>
  );
};

export const GraphQLErrorDisplay = injectSheet(graphqlErrorDisplayStyle)(GraphQLErrorDisplayBare);
