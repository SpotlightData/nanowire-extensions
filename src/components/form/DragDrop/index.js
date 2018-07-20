import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { remove } from 'ramda';

import Container from './Container';

export class DragDrop extends PureComponent {
  componentWillMount() {
    const { input, options } = this.props;
    input.onChange(options);
  }

  onRemove = index => {
    const { input, options } = this.props;
    input.onChange(remove(index, 1, options));
  };

  render() {
    const { input, options, meta } = this.props;
    const error = meta.error || meta.submitError;
    return (
      <div>
        <Container options={options} onChange={input.onChange} onRemove={this.onRemove} />
        {error && <span className="field-error">{error}</span>}
      </div>
    );
  }
}

DragDrop.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    checked: PropTypes.bool,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitError: PropTypes.string,
  }),
};

DragDrop.defaultProps = {
  options: [],
  meta: {
    error: undefined,
    submitError: undefined,
  },
};
