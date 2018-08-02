import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Card, Row, Col } from 'antd';
import { Table } from '../../components/antd/Table';

import { deprecationWarning } from '../../internal/warning';
import { withUppy } from '../withUppy';
import createDefaultColumns from './columns';

const defaultHeaderRender = files => {
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

class FileTable extends PureComponent {
  state = { files: [], loaded: false };

  componentDidMount() {
    const { uppy } = this.props;

    this.updateFiles();
    uppy.on('file-batch', this.updateFiles);
    uppy.on('file-removed', this.updateFiles);
    if (this.props.sumbitRender !== undefined) {
      deprecationWarning('sumbitRender will be removed, please use footerRender prop');
    }
  }

  componentWillUnmount() {
    this.props.uppy.off('file-batch', this.updateFiles);
    this.props.uppy.off('file-removed', this.updateFiles);
  }

  takeFiles = () => Object.values(this.props.uppy.getState().files).slice();

  updateFiles = () => {
    // The main reason for putting files to state is for re-rendering purposes
    this.setState({ files: this.takeFiles(), loaded: true });
  };

  handleRemove = id => () => this.props.uppy.removeFile(id);

  render() {
    const { files, loaded } = this.state;
    const { className, sumbitRender, footerRender, createColumns, headerRender } = this.props;
    if (!loaded) {
      return null;
    }
    const footerRenderFn = sumbitRender || footerRender;

    return (
      <Card className={className}>
        {headerRender(files)}
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
