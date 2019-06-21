import * as React from 'react';
import * as R from 'ramda';

export interface ValidateSavedProps<S, F> {
  saved: S;
  format: (saved: S) => F;
  contentRender: (valid: boolean) => React.ReactNode;
  loadingRender: () => React.ReactNode;
  whenValid: (formatted: F) => void;
  whenInValid: (saved: S) => void;
  validate: (formatted: F) => Promise<boolean>;
}

interface ValidateSavedState<S> {
  loading: boolean;
  valid: boolean;
  saved: S | undefined;
}

export class ValidateSaved<S, F> extends React.PureComponent<
  ValidateSavedProps<S, F>,
  ValidateSavedState<S>
> {
  state: ValidateSavedState<S> = { loading: true, valid: false, saved: undefined };

  componentDidUpdate(pProps: ValidateSavedProps<S, F>, pState: ValidateSavedState<S>) {
    if (this.hasChangeSaved()) {
      this.validate();
    }
  }

  componentDidMount() {
    this.validate();
  }

  hasChangeSaved() {
    return !R.equals(this.state.saved, this.props.saved);
  }

  done(valid: boolean, data: S | F) {
    if (valid) {
      this.props.whenValid(data as F);
    } else {
      this.props.whenInValid(data as S);
    }
    this.setState({ loading: false, valid, saved: this.props.saved });
  }

  async validate() {
    this.setState({ loading: true });

    const { saved, validate, format } = this.props;
    if (!saved) {
      return this.done(false, saved);
    }
    const data = format(saved);
    const isValid = await validate(data);
    this.done(isValid, data);
  }

  render() {
    const { loadingRender, contentRender } = this.props;
    const { loading, valid } = this.state;
    if (loading || this.hasChangeSaved()) {
      return loadingRender();
    }
    return contentRender(valid);
  }
}
