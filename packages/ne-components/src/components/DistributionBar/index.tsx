import * as React from 'react';
import * as R from 'ramda';
import { Row, Tooltip } from 'antd';
import { useTransition, animated } from 'react-spring';
import { KeyValueColor, kvsToString, percentage } from '@spotlightdata/ne-helpers';
import { usePrevious } from 'react-use';

export interface DistributionBarProps {
  entries: KeyValueColor<number>[];
  height: number;
  onClick?: (item: KeyValueColor<number>) => void;
}

export const DistributionBar: React.FC<DistributionBarProps> = ({ entries, onClick, height }) => {
  const sum = R.reduce((acc, b) => acc + b.value, 0, entries);
  const prev = usePrevious(kvsToString(entries));

  const setWidth = (n: KeyValueColor<number>) => ({ height, width: `${(n.value / sum) * 100}%` });

  const transitions = useTransition(entries, item => item.key, {
    from: { width: '0%', height },
    enter: setWidth,
    leave: { width: '0%', height },
    update: setWidth,
    reset: prev !== kvsToString(entries),
  });

  const onClickBox = (e: React.MouseEvent<HTMLDivElement>) => {
    const key = (e.target as HTMLDivElement).dataset.key;
    const selected = R.find(R.propEq('key', key), entries);
    if (selected && typeof onClick !== 'undefined') {
      onClick(selected);
    }
  };

  return (
    <Row type="flex">
      {transitions.map(({ item, key, props }) => (
        <Tooltip title={`${item.key} ${item.value} (${percentage(item.value, sum)})`} key={key}>
          <animated.div
            key={key}
            data-key={item.key}
            onClick={onClickBox}
            style={{
              ...props,
              backgroundColor: item.color,
              cursor: onClick ? 'pointer' : 'inherit',
            }}
          />
        </Tooltip>
      ))}
    </Row>
  );
};
