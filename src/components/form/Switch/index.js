import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch as AntSwitch } from 'antd';

export class Switch extends PureComponent {
  componentWillMount() {
    const { input } = this.props;
    input.onChange(String(input.value) === 'true');
  }

  render() {
    const { input, meta } = this.props;
    const error = meta.error || meta.submitError;
    return (
      <div className="field">
        <AntSwitch defaultChecked={String(input.value) === 'true'} onChange={input.onChange} />
        {error && <span className="field-error">{error}</span>}
      </div>
    );
  }
}

Switch.propTypes = {
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string.isRequired,
    submitError: PropTypes.string.isRequired,
  }),
};

Switch.defaultProps = {
  meta: {
    error: undefined,
    submitError: undefined,
  },
};

Switch.displayName = 'Switch';
