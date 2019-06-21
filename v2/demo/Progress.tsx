import * as React from 'react';
import { SimpleProgressBar } from '../source';

export class Progress extends React.PureComponent {
  state = { failed: 10, success: 0, total: 200 };

  bloop = () => {
    const { success, failed, total } = this.state;
    if (success + failed !== total) {
      this.setState({ success: success + 1 });
      setTimeout(this.bloop, 10);
    }
  };

  componentDidMount() {
    this.bloop();
  }

  render() {
    return <SimpleProgressBar {...this.state} />;
  }
}
