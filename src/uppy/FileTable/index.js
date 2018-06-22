import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Card, Row, Col } from 'antd';
import { Table } from '../../components/antd/Table';

import { withUppy } from '../withUppy';
import createDefaultColumns from './columns';

class FileTable extends PureComponent {
  state = { files: [], loaded: false };

  componentDidMount() {
    const { uppy } = this.props;

    this.updateFiles();
    uppy.on('file-batch', this.updateFiles);
    uppy.on('file-removed', this.updateFiles);
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
    const { className, sumbitRender, createColumns } = this.props;
    if (!loaded) {
      return null;
    }
    return (
      <Card className={className}>
        <Row className="summary">
          <Col xs={4}>
            <h2>Pending Files</h2>
          </Col>
          <Col xs={2} className="stats">
            <span>
              Total files: <b>{files.length}</b>
            </span>
          </Col>
        </Row>
        <Table
          rowKey={r => r.id}
          locale={{ emptyText: 'Please upload files' }}
          dataSource={files}
          columns={createColumns(this.handleRemove)}
        />
        <div className="pending-footer">{sumbitRender(files)}</div>
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
  sumbitRender: PropTypes.func.isRequired,
  createColumns: PropTypes.func.isRequired,
};

FileTable.defaultProps = {
  className: '',
  createColumns: createDefaultColumns,
};

export const UppyFileTable = withUppy(FileTable);
