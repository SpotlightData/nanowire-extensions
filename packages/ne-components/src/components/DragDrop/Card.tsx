// @ts-nocheck
import * as React from 'react';
import * as R from 'ramda';
import { DragSource, DropTarget, ConnectDropTarget, ConnectDragSource } from 'react-dnd';

import injectSheet from 'react-jss';
import cn from 'classnames';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ITEM_TYPES } from './itemTypes';
import { DragDropData } from './interface';

const style = {
  container: {
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: '#E9E9E9',
    cursor: 'move',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    color: 'red',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export interface CardBareClasses {
  container: string;
  icon: string;
}

export interface CardProps {
  moveCard(dragIndex: number, hoverIndex: number): void;
  data: DragDropData;
  id: string;
  index: number;
  onRemove: (index: number) => void;
}

export interface CardBareProps extends CardProps {
  classes: CardBareClasses;
  isDragging: boolean;
  connectDropTarget: ConnectDropTarget;
  connectDragSource: ConnectDragSource;
}

// Has to be a class, for the dragDrop to work
class CardBare extends React.PureComponent<CardBareProps> {
  render() {
    const {
      data,
      isDragging,
      connectDragSource,
      connectDropTarget,
      onRemove,
      index,
      id,
      classes,
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      connectDropTarget(
        <div style={{ opacity }} className={cn(classes.container, 'drag-drop-card')} id={id}>
          <span>{data.title}</span>
          <CloseCircleOutlined
            className={cn(classes.icon, 'drag-drop-card-close')}
            onClick={() => onRemove(index)}
            role="button"
            tabIndex={0} />
        </div>
      )
    );
  }
}

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

export const Card = R.pipe(
  injectSheet(style),
  // @ts-ignore
  DropTarget(ITEM_TYPES.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource(ITEM_TYPES.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))
)(CardBare);
