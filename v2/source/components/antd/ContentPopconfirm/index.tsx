import * as React from 'react';
import { Popover, Row, Button, Icon } from 'antd';
import { PopoverProps } from 'antd/lib/popover';
import { TooltipTrigger } from 'antd/lib/tooltip';

export interface ContentPopconfirmProps extends PopoverProps {
  okText?: string;
  cancelText?: string;
  content?: string | React.ReactNode;
  onConfirm: () => void;
  title: string | React.ReactNode;
  icon?: string;
  iconColor?: string;
}

type State = {
  visible: boolean;
};

export class ContentPopconfirm extends React.Component<ContentPopconfirmProps, State> {
  state: State = {
    visible: false,
  };
  static defaultProps = {
    okText: 'Yes',
    cancelText: 'No',
    content: '',
    icon: 'exclamation-circle',
    iconColor: '#faad14',
  };

  public handleVisibleChange = (visible: boolean) => {
    this.setState({ visible });
  };

  render() {
    const { visible } = this.state;
    const {
      content,
      cancelText,
      okText,
      onConfirm,
      children,
      title,
      icon,
      iconColor,
      ...props
    } = this.props;
    const fullContent = (
      <div style={{ padding: '0.3em' }}>
        <Row>
          <Icon
            type={icon}
            theme="filled"
            style={{ fontSize: '14px', color: iconColor, marginRight: '0.5em' }}
          />
          {title}
        </Row>
        <Row style={{ margin: '0.3em 0' }}>{content}</Row>
        <Row>
          <Button
            className="left-floated"
            size="small"
            onClick={e => this.handleVisibleChange(false)}
          >
            {cancelText}
          </Button>
          <Button
            className="right-floated"
            size="small"
            type="primary"
            onClick={e => {
              this.handleVisibleChange(false);
              onConfirm();
            }}
            style={{ marginLeft: '0.5em' }}
          >
            {okText}
          </Button>
        </Row>
      </div>
    );
    return (
      <Popover
        content={fullContent}
        placement="top"
        trigger={'click' as TooltipTrigger}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        {...props}
      >
        {children}
      </Popover>
    );
  }
}
