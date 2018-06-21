import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

import { Icon } from 'antd';

import { apply } from '../../../helpers/apply';

const ItemTypes = {
  CARD: 'card',
};

const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: '#E9E9E9',
  cursor: 'move',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const iconStyle = {
  color: 'red',
  cursor: 'pointer',
  fontSize: '16px',
};
// Has to be a class, for the dragDrop to work
class Card extends PureComponent {
  render() {
    const {
      data,
      isDragging,
      connectDragSource,
      connectDropTarget,
      onRemove,
      index,
      id,
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      connectDropTarget(
        <div style={{ ...style, opacity }} id={id}>
          <span>{data.title}</span>
          <Icon
            type="close-circle"
            style={iconStyle}
            onClick={() => onRemove(index)}
            role="button"
            tabIndex={0}
          />
        </div>
      )
    );
  }
}

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  moveCard: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    // Determine rectangle on screen
    const element = document.getElementById(component.props.id);
    if (element === null) {
      return;
    }
    const hoverBoundingRect = element.getBoundingClientRect();
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    // eslint-disable-next-line
    monitor.getItem().index = hoverIndex;
  },
};

export default apply(
  DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))
)(Card);
