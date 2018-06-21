import React from 'react';
import { Table } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';
import sid from 'shortid';

const columns = [
  {
    dataIndex: 'name',
  },
];

const data = Array.from({ length: 11 }).map(() => ({ name: sid.generate(), _id: sid.generate() }));

describe('components/antd/Table', () => {
  it('should set default pagination', () => {
    const { container, debug, getByText } = render(<Table columns={columns} dataSource={data} />);
    const items = container.getElementsByClassName('ant-pagination-item');
    expect(items.length).toBe(2);
  });
});
