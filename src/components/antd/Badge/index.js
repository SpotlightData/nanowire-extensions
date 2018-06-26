import React from 'react';

import { Badge as AntBadge } from 'antd';

export const Badge = props => <AntBadge overflowCount={99999} {...props} />;

Badge.displayName = 'Badge';
