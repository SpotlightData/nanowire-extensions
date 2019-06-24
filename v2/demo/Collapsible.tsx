import * as React from 'react';
import { CollapsiblePanel, calcCollapsiblePanelMargin } from '../source';
import { Switch } from 'antd';

interface CollapsibleProps {}
interface CollapsibleState {
  items: boolean[];
}

const height = 46;

export class Collapsible extends React.Component<CollapsibleProps, CollapsibleState> {
  state = {
    items: [true, true],
  };

  onChange = (index: number) => {
    return (change: boolean) => {
      const items = this.state.items;
      items[index] = change;
      this.setState({ items });
    };
  };

  basic(items: boolean[]) {
    return (
      <CollapsiblePanel
        header="Timeline"
        onClick={this.onChange(0)}
        collapsed={items[0]}
        duration={0}
        height={height}
      >
        <p style={{ margin: 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </CollapsiblePanel>
    );
  }

  withExtra(items: boolean[]) {
    const extraContent = (
      <div style={{ marginTop: `calc((${height}px - 1em - ${22}px) / 2)` }}>
        <Switch checked={!items[1]} onChange={change => this.onChange(1)(!change)} />
      </div>
    );
    return (
      <CollapsiblePanel
        header="Timeline"
        onClick={this.onChange(1)}
        collapsed={items[1]}
        duration={0}
        height={height}
        extraContent={extraContent}
      >
        <p style={{ margin: 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </CollapsiblePanel>
    );
  }

  render() {
    const { items } = this.state;
    return (
      <React.Fragment>
        {this.basic(items)}
        {this.withExtra(items)}
      </React.Fragment>
    );
  }
}
