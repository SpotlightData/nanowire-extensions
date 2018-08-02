import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import sid from 'shortid';

import { Uploader, getPluginId } from './Uploader';
import { withUppy } from '../withUppy';
import { deprecationWarning } from '../../internal/warning';

class OneDriveUploaderBare extends PureComponent {
  constructor(props) {
    super(props);
    this.id = 'OneDriveUploader_' + sid.generate();
  }

  componentDidMount() {
    const { uppy, text, appId, options } = this.props;
    if (this.getPlugin()) {
      return;
    }
    this.settings = Object.assign(
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
    uppy.use(Uploader, this.settings);
  }

  componentWillUnmount() {
    const plugin = this.getPlugin();
    if (plugin) {
      this.props.uppy.removePlugin(plugin);
    }
  }

  getPlugin() {
    if (!this.settings) {
      return false;
    }
    return this.props.uppy.getPlugin(getPluginId(this.settings));
  }

  render() {
    return <div id={this.id} className={this.props.className} />;
  }
}

OneDriveUploaderBare.propTypes = {
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

OneDriveUploaderBare.defaultProps = {
  className: '',
  text: 'Upload OneDrive files',
  options: {},
};

export const OneDriveUploader = withUppy(OneDriveUploaderBare);
export const OneDrive = props => {
  // 2.0 REMOVAL
  deprecationWarning('OneDrive component will be removed, please use OneDriveUploader', []);
  return <OneDriveUploader {...props} />;
};
