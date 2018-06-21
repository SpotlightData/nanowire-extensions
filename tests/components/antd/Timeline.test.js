import React from 'react';
import { Timeline } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';
import sid from 'shortid';

const items = Array.from({ length: 11 }).map(() => ({ name: sid.generate() }));

describe('components/antd/Timeline', () => {
  it('should display entries via key accessor', () => {
    const { container, debug } = render(<Timeline items={items} accessor="name" />);
    const content = Array.from(container.getElementsByClassName('ant-timeline-item-content')).map(
      node => node.textContent
    );
    expect(content).toEqual(items.map(item => item.name));
  });

  it('should display entries via function accessor', () => {
    const { container, debug } = render(<Timeline items={items} accessor={a => a.name} />);
    const content = Array.from(container.getElementsByClassName('ant-timeline-item-content')).map(
      node => node.textContent
    );
    expect(content).toEqual(items.map(item => item.name));
  });
});
