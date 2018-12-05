import React, { PureComponent } from 'react';
import { func, any } from 'prop-types';

import * as R from 'ramda';

export class ValidateSaved extends PureComponent {
  state = { loading: true, valid: false };

  componentDidUpdate(pProps, pState) {
    if (!R.equals(pProps.saved, this.props.saved)) {
      this.validate();
    }
  }

  componentDidMount() {
    this.validate();
  }

  done(valid, data) {
    if (valid) {
      this.props.whenValid(data);
    } else {
      this.props.whenInValid(data);
    }
    this.setState({ loading: false, valid });
  }

  async validate() {
    this.setState({ loading: true });

    const { saved, validate, format } = this.props;
    if (!saved) {
      return this.done(false);
    }
    const data = format(saved);
    const isValid = await validate(data);
    this.done(isValid, data);
  }

  render() {
    const { loadingRender, contentRender } = this.props;
    const { loading, valid } = this.state;
    if (loading) {
      return loadingRender();
    }
    return contentRender(valid);
  }
}

ValidateSaved.propTypes = {
  // Content to display while validating
  loadingRender: func.isRequired,
  // Will be rendered after checks are complete
  contentRender: func.isRequired,
  // Should return user
  saved: any,
  // Format the user before trying to validate it
  format: func.isRequired,
  // Has to return a promise, will be called if getSaved returns a user
  validate: func.isRequired,
  // Will execute before content render if user is invalid
  whenInValid: func.isRequired,
  // Will execute before content render if user is valid
  whenValid: func.isRequired,
};
