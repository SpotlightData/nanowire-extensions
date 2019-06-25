import * as React from 'react';
import { SimpleProgressBar } from '../source';
import { Row } from 'antd';
import { store, CASES, R1State } from './redux';

const r1state = () => store.getState()['r1state'] as R1State;

export class Progress extends React.PureComponent {
  state = r1state();

  bloop = () => {
    store.dispatch({ type: CASES.INCREASE, progress: 1 });
    this.setState(r1state(), () => setTimeout(this.bloop, 50));
  };

  componentDidMount() {
    this.reset();
    this.bloop();
  }

  reset() {
    store.dispatch({ type: CASES.SET, failed: 10, total: 200, progress: 0 });
  }

  render() {
    const { failed, progress, total } = this.state;
    return (
      <Row type="flex">
        <div style={{ width: '90%' }}>
          <SimpleProgressBar failed={failed} total={total} success={progress} />
        </div>
        <button onClick={() => this.reset()}>RESET</button>
      </Row>
    );
  }
}
