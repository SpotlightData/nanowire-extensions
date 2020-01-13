import * as React from 'react';
import injectSheet from 'react-jss';
import { Dictionary } from 'ts-essentials';

interface ScrollListClasses extends Dictionary<string> {
  container: string;
  table: string;
  row: string;
  activeRow: string;
}

const style = {
  container: { overflowY: 'scroll' as React.CSSProperties['overflowY'] },
  table: { width: '100%' },
  row: {
    border: '1px solid #ebedf0',
    padding: '8px 12px',
    cursor: 'pointer',
  },
  activeRow: {
    extend: 'row',
    fontWeight: 'bold' as React.CSSProperties['fontWeight'],
    color: '#1890ff',
  },
};

export interface ScrollListProps<T> {
  items: Dictionary<T>;
  onClick(id: string, item: T): void;
  accessor(item: T): React.ReactNode;
  isActive(item: string): boolean;
  height: number;
}

export interface ScrollListBareProps<T> extends ScrollListProps<T> {
  classes: ScrollListClasses;
}

class ScrollListBare<T> extends React.PureComponent<ScrollListBareProps<T>> {
  handleClick = (id: string) => () => {
    this.props.onClick(id, this.props.items[id]);
  };

  render() {
    const { items, accessor, height, isActive, classes } = this.props;
    const rows = Object.keys(items).map(id => {
      const text = accessor(items[id]);
      const active = isActive(id);
      return (
        <tr key={id}>
          <td className={active ? classes.activeRow : classes.row} onClick={this.handleClick(id)}>
            {text}
          </td>
        </tr>
      );
    });
    return (
      <div style={{ height: `${height}px` }} className={classes.container}>
        <table className={classes.table}>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export const ScrollList = injectSheet(style)(ScrollListBare);
