import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import injectStyles from 'react-jss';
import sid from 'shortid';

import style from './style';

class ScrollListComponent extends PureComponent {
  handleClick = id => () => {
    this.props.onClick(id, this.props.items[id]);
  };

  render() {
    const { items, accessor, height, isActive, classes } = this.props;
    const rows = Object.keys(items).map(id => {
      const text = accessor(items[id]);
      const active = isActive(id);
      return (
        <tr key={sid.generate()}>
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

ScrollListComponent.propTypes = {
  items: PropTypes.shape({}).isRequired,
  accessor: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  isActive: PropTypes.func,
  classes: PropTypes.shape({
    row: PropTypes.string.isRequired,
    activeRow: PropTypes.string.isRequired,
    table: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export const ScrollList = injectStyles(style)(ScrollListComponent);
