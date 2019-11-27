import * as React from 'react';

import { BadgeProps, default as AntBadge } from 'antd/lib/badge';

export const Badge: React.FC<BadgeProps> = props => <AntBadge overflowCount={99999} {...props} />;

Badge.displayName = 'Badge';
