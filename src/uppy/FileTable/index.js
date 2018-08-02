import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Card, Row, Col } from 'antd';
import { Table } from '../../components/antd/Table';

import { deprecationWarning } from '../../internal/warning';
import { withUppy } from '../withUppy';
import createDefaultColumns from './columns';

const defaultHeaderRender = ({ files }) => {
  return (
    <Row>
      <Col span={12}>
        <h2>Pending Files</h2>
      </Col>
      <Col span={12}>
        <span className="right-floated">
          Total files: <b>{files.length}</b>
        </span>
      </Col>
    </Row>
  );
};

const debounce = (func, delay) => {
  let inDebounce;
  return () => {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

class FileTable extends PureComponent {
  constructor(props) {
    super(props);
    this.updateFilesBounced = debounce(this.updateFiles, 200);
    this.state = { files: [], loaded: false };
  }

  componentDidMount() {
    const { uppy } = this.props;

    this.updateFiles();
    uppy.on('file-batch', this.updateFilesBounced);
    uppy.on('file-removed', this.updateFilesBounced);
    if (this.props.sumbitRender !== undefined) {
      deprecationWarning('sumbitRender will be removed, please use footerRender prop');
    }
  }

  componentWillUnmount() {
    this.props.uppy.off('file-batch', this.updateFilesBounced);
    this.props.uppy.off('file-removed', this.updateFilesBounced);
  }

  takeFiles = () => Object.values(this.props.uppy.getState().files).slice();

  updateFiles = () => {
    // The main reason for putting files to state is for re-rendering purposes
    this.setState({ files: this.takeFiles(), loaded: true });
  };

  removeAllFiles = e => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    this.state.files.map(file => this.props.uppy.removeFile(file.id));
  };

  handleRemove = id => () => this.props.uppy.removeFile(id);

  render() {
    const { files, loaded } = this.state;
    const { className, sumbitRender, footerRender, createColumns, headerRender } = this.props;
    const footerRenderFn = sumbitRender || footerRender;

    if (!loaded) {
      return null;
    }

    return (
      <Card className={className}>
        {headerRender({ files, removeAllFiles: this.removeAllFiles })}
        <Table
          rowKey={r => r.id}
          locale={{ emptyText: 'Please upload files' }}
          dataSource={files}
          columns={createColumns(this.handleRemove)}
        />
        {footerRenderFn(files)}
      </Card>
    );
  }
}

FileTable.propTypes = {
  uppy: PropTypes.shape({
    removeFile: PropTypes.func,
    getPlugin: PropTypes.func,
    getState: PropTypes.func,
    use: PropTypes.func,
    on: PropTypes.func,
    off: PropTypes.func,
  }).isRequired,
  className: PropTypes.string,
  // 2.0 REMOVAL
  // Only leave one function
  sumbitRender: PropTypes.func,
  footerRender: PropTypes.func,
  headerRender: PropTypes.func,
  createColumns: PropTypes.func,
};

FileTable.defaultProps = {
  className: '',
  createColumns: createDefaultColumns,
  headerRender: defaultHeaderRender,
};

export const UppyFileTable = withUppy(FileTable);
