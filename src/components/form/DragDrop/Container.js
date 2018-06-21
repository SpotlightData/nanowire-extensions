import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { slice, remove, insert } from 'ramda';
import shortid from 'shortid';
import Card from './Card';

class Container extends PureComponent {
  moveCard = (dragIndex, hoverIndex) => {
    const { options, onChange } = this.props;
    const dragCard = Object.assign({}, options[dragIndex]);
    const slicedArray = remove(dragIndex, 1, options);
    const newLayout = insert(hoverIndex, dragCard, slicedArray);
    this.props.onChange(newLayout);
  };

  render() {
    const { options, onRemove } = this.props;

    return (
      <div>
        {options.map((option, i) => (
          <Card
            key={shortid.generate()}
            id={shortid.generate()}
            index={i}
            data={option}
            moveCard={this.moveCard}
            onRemove={onRemove}
          />
        ))}
      </div>
    );
  }
}

Container.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default DragDropContext(HTML5Backend)(Container);
