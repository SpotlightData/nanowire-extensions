import * as React from 'react';
import { render } from 'react-dom';
import { Progress } from './Progress';
import { Collapsible } from './Collapsible';
import { FormDemo } from './Form';

import 'antd/dist/antd.css';

const MOUNT_NODE = document.getElementById('root');

function entry(entry: React.ReactNode) {
  return <div style={{ margin: '2em' }}>{entry}</div>;
}

render(
  <React.Fragment>
    {entry(<Progress />)}
    {entry(<Collapsible />)}
    {entry(<FormDemo />)}
  </React.Fragment>,
  MOUNT_NODE
);
