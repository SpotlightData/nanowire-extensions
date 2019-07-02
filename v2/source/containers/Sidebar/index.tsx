import * as React from 'react';
import * as R from 'ramda';

import { History } from 'history';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col } from 'antd';

import cn from 'classnames';
import injectSheet from 'react-jss';

import { sidebarStyle, SidebarClasses } from './style';
import { ClickParam } from 'antd/lib/menu';
import { SidebarMenu } from '../../interfaces';
import { RouteChildrenProps } from 'react-router';

export interface SideBareProps extends RouteChildrenProps {
  isMobile: boolean;
  toggle(state: boolean): void;
  open: boolean;
  classes: SidebarClasses;
  menu: SidebarMenu;
  logo: React.ReactNode;
  expandedWidth: number;
  collapsedWidth?: number;
}

class SidebarBare extends React.Component<SideBareProps, any> {
  static defaultProps = {
    collapsedWidth: 64,
  };

  changeRoute = ({ key }: ClickParam) => {
    if (this.props.isMobile && this.props.open) {
      this.props.toggle(false);
    }
    this.props.history.push(key);
  };

  closeButton(
    isMobile: boolean,
    isOpen: boolean,
    className: string,
    toggle: SideBareProps['toggle']
  ) {
    if (isMobile && isOpen) {
      return (
        <div className={className} role="button" tabIndex={-1} onClick={() => toggle(false)}>
          <Icon type="close" />
        </div>
      );
    } else {
      return null;
    }
  }

  getSelectedKeys() {
    // Remove the first path for easier splitting
    const pathnames = this.props.history.location.pathname.replace('/', '').split('/');
    if (pathnames.length === 0) {
      return [];
    }
    return [`/${pathnames}`];
  }

  render() {
    const {
      classes,
      open,
      menu,
      expandedWidth,
      logo,
      collapsedWidth,
      isMobile,
      toggle,
    } = this.props;

    const siderClass = cn({
      [classes.root]: true,
      [classes.collapsed]: !open,
      [classes.fixed]: isMobile,
    });

    const selectedKeys = this.getSelectedKeys();

    const items = menu.map(item => (
      <Menu.Item key={item.link}>
        <Row>
          <Col span={4}>
            <Icon type={item.icon} />
          </Col>
          <Col span={20}>
            <a>{item.name}</a>
          </Col>
        </Row>
      </Menu.Item>
    ));

    return (
      <Layout.Sider
        className={siderClass}
        collapsed={!open}
        width={expandedWidth}
        collapsedWidth={isMobile ? 0 : collapsedWidth}
      >
        {this.closeButton(isMobile, open, classes.closeButton, toggle)}
        <Row>
          <div>{logo}</div>
        </Row>
        <Menu
          theme="dark"
          mode={!open ? 'vertical' : 'inline'}
          onClick={this.changeRoute}
          selectedKeys={selectedKeys}
        >
          {items}
        </Menu>
      </Layout.Sider>
    );
  }
}

export const Sidebar = R.pipe(
  injectSheet(sidebarStyle),
  withRouter
)(SidebarBare);
