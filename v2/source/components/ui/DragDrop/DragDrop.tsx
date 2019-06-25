import * as React from 'react';
import * as R from 'ramda';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import shortid from 'shortid';
import { Card } from './Card';
import { DragDropData } from './interface';

export interface DragDropBareProps {
  options: DragDropData[];
  onChange: (items: DragDropData[]) => void;
  onRemove: (index: number) => void;
}

class DragDropBare extends React.Component<DragDropBareProps> {
  moveCard = (dragIndex: number, hoverIndex: number) => {
    const { options, onChange } = this.props;
    const dragCard = Object.assign({}, options[dragIndex]);
    const slicedArray = R.remove(dragIndex, 1, options);
    const newLayout = R.insert(hoverIndex, dragCard, slicedArray);
    this.props.onChange(newLayout);
  };

  render() {
    const { options, onRemove } = this.props;

    return (
      <div>
        {options.map((option, i) => (
          <Card
            key={option.id}
            id={option.id}
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

export const DragDrop = DragDropContext(HTML5Backend)(DragDropBare);
