# MenuItem

### About

Alternative to using `Menu.Item` as this allows to have menu items with no tooltip.
Motivation: Using tooltip with a lot of menu items can cause quite a lot of cpu usage because of dom modifications that happen.

### Parameters

Rest of the props will be passed down as usuall

```javascript
MenuItem.propTypes = {
  withTooltip: PropTypes.bool,
  tooltipProps: PropTypes.shape({})
};

MenuItem.defaultProps = {
  withTooltip: false,
  tooltipProps: {},
};

```

https://ant.design/components/menu/

### Example

```javascript
import { Menu, Button } from 'antd';
import { MenuItem } from '@spotlightdata/nanowire-extensions';

const menu = (
	<Menu mode="inline" >
	  <MenuItem withTooltip={true} key="1"><Button>Option 1</Button></MenuItem>
	</Menu>
);
```
