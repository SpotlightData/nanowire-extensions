import React, { PureComponent } from 'react';
import { func, shape, string } from 'prop-types';

import { Link } from 'react-router-dom';

import { queryUrlToObject } from '../../../helpers/main';
import { placeHolderSub } from '../../../shared/constants';

import { Breadcrumb } from 'antd';
import sid from 'shortid';

const cropText = text => (text.length > 20 ? `${text.slice(0, 20)}...` : text);

const makeLink = config => (
  <Breadcrumb.Item key={sid.generate()}>
    <Link to={config.link}>{cropText(config.text)}</Link>
  </Breadcrumb.Item>
);

export class SmartBreadcrumb extends PureComponent {
  state = {
    crumbs: [],
    loading: true,
  };

  action$ = placeHolderSub;
  unlisten = undefined;

  componentDidMount() {
    const { history } = this.props;
    let lastUrl;
    this.unlisten = history.listen(({ pathname, search }) => {
      if (lastUrl !== pathname) {
        lastUrl = pathname;
        this.action$.unsubscribe();
        this.updateCrumbs(pathname, search);
      }
    });
    this.updateCrumbs(history.location.pathname, history.location.search);
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
    this.action$.unsubscribe();
  }

  updateCrumbs(path, searchString) {
    this.setState({ loading: true });

    const search = queryUrlToObject(searchString);
    this.action$ = this.props.getBreadcrumbs({ path, search }).subscribe(respE =>
      respE
        .ifLeft(() => {
          this.setState({ loading: false, crumbs: [] });
        })
        .ifRight(crumbs => {
          this.setState({ loading: false, crumbs });
        })
    );
  }

  render() {
    const { crumbs, loading } = this.state;
    const { className, loadingClass, containerClass } = this.props;

    let content;
    if (loading) {
      content = (
        <div className={`${loadingClass}-container`}>
          <span className={loadingClass} />
        </div>
      );
    } else {
      content = (
        <div className={containerClass}>
          <Breadcrumb>{crumbs.map(makeLink)}</Breadcrumb>
        </div>
      );
    }

    return <div className={className}>{content}</div>;
  }
}

SmartBreadcrumb.propTypes = {
  // Function that will be asked the data of breadcrumbs, should return rxjs subscriber wrapped in Either class
  getBreadcrumbs: func.isRequired,
  // React-router-dom history
  history: shape({}).isRequired,
  loadingClass: string,
  containerClass: string,
};

SmartBreadcrumb.defaultProps = {
  loadingClass: 'loading-dots',
  containerClass: 'text-container',
};
