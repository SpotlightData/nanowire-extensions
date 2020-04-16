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
  const tooltipRef = React.createRef<HTMLDivElement>();
  const rowRef = React.createRef<HTMLDivElement>();

  const setWidth = (n: KeyValueColor<number>) => ({ height, width: `${(n.value / sum) * 100}%` });

  const transitions = useTransition(entries, (item) => item.key, {
    from: { width: '0%', height },
    enter: setWidth,
    leave: { width: '0%', height },
    update: setWidth,
    reset: prev !== kvsToString(entries),
  });

  const onClickBox = (e: React.MouseEvent<HTMLDivElement>) => {
    const key = (e.target as HTMLDivElement).dataset.key;
    const selected = R.find(R.propEq('key', key), entries) as KeyValueColor<number>;
    if (selected && typeof onClick !== 'undefined') {
      onClick(selected);
    }
  };

  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tooltipRef.current && rowRef.current) {
      const el = e.target as HTMLDivElement;
      const tooltip = tooltipRef.current;
      const row = rowRef.current;
      const text = el.dataset.tip || null;

      const rBox = row.getBoundingClientRect();

      tooltip.childNodes[0].textContent = text;
      const dbox = el.getBoundingClientRect();
      tooltip.style.left = `${dbox.left - rBox.left}px`;
      tooltip.style.top = `${dbox.top - rBox.top - 50}px`;
      tooltip.style.display = 'block';
    }
  };

  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = 'none';
    }
  };

  return (
    <div ref={rowRef}>
      <Row onMouseLeave={onLeave} style={{ position: 'relative' }}>
        <div
          ref={tooltipRef}
          className="ant-tooltip"
          style={{ display: 'none', maxWidth: 'inherit', width: '250px' }}
        >
          <div className="ant-tooltip-inner" />
        </div>
        {transitions.map(({ item, key, props }) => (
          <animated.div
            data-tip={`${item.key} ${item.value} (${percentage(item.value, sum)}%)`}
            key={key}
            data-key={item.key}
            data-value={item.value}
            onClick={onClickBox}
            onMouseEnter={onEnter}
            style={{
              ...props,
              backgroundColor: item.color,
              cursor: onClick ? 'pointer' : 'inherit',
            }}
          />
        ))}
      </Row>
    </div>
  );
};
