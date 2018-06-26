import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import sid from 'shortid';

import { Uploader } from './Uploader';
import { withUppy } from '../withUppy';

export class OneDriveBare extends PureComponent {
  componentWillMount() {
    this.id = sid.generate();
  }

  componentDidMount() {
    const { uppy, text, appId, options } = this.props;
    if (this.getPlugin()) {
      return;
    }

    const settings = Object.assign(
      {
        target: `#${this.id}`,
        appId,
        text,
        buttonClass: 'ant-btn ant-btn-primary',
        getMetaFromForm: true,
        note: '',
      },
      options
    );
    uppy.use(Uploader, settings);
  }

  componentWillUnmount() {
    const plugin = this.getPlugin();
    if (plugin) {
      this.props.uppy.removePlugin(plugin);
    }
  }

  getPlugin() {
    return this.props.uppy.getPlugin('OneDriveUpload');
  }

  render() {
    return <div id={this.id} className={this.props.className} />;
  }
}

OneDriveBare.propTypes = {
  uppy: PropTypes.shape({
    removePlugin: PropTypes.func,
    getPlugin: PropTypes.func,
    use: PropTypes.func,
  }).isRequired,
  className: PropTypes.string,
  text: PropTypes.string,
  appId: PropTypes.string.isRequired,
  options: PropTypes.shape({}),
};

OneDriveBare.defaultProps = {
  className: '',
  text: 'Upload OneDrive files',
  options: {},
};

export const OneDrive = withUppy(OneDriveBare);
