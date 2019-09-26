import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useEventListener from '@use-it/event-listener';

export interface MousePosition {
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
}

export interface PopoverProps {
  textRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  isOpen: boolean;
  onClose(): void;
  onOpen(mouse: MousePosition, text: string): void;
  style?: React.CSSProperties;
}

// Will walk upward till a parent is found
function findParent(parent: HTMLElement, from: HTMLElement): boolean {
  let node = from;
  while (node !== null) {
    if (node.isSameNode(parent)) {
      return true;
    }
    node = node.parentNode as HTMLElement;
  }
  return false;
}

export const Popover: React.FC<PopoverProps> = ({
  textRef,
  children,
  isOpen,
  onClose,
  onOpen,
  style,
}) => {
  const ref = React.createRef<HTMLDivElement>();

  useEventListener('mousedown', (e: React.MouseEvent) => {
    // Not left button
    if (e.button !== 0) {
      return;
    }
    // Outside parent, close down modal
    if (!findParent(ref.current, e.target as HTMLElement)) {
      onClose();
    }
  });

  useEventListener('mouseup', (e: React.MouseEvent) => {
    // Not left button
    if (e.button !== 0) {
      return;
    }
    const selection = document.getSelection();
    if (
      !selection ||
      selection.toString().length === 0 ||
      !findParent(textRef.current, e.target as HTMLElement)
    ) {
      return;
    }
    const { clientX, clientY, pageX, pageY, screenX, screenY } = e;
    onOpen({ clientX, clientY, pageX, pageY, screenX, screenY }, selection.toString());
  });
  return ReactDOM.createPortal(
    <div
      ref={ref}
      style={{
        display: isOpen ? 'block' : 'none',
        boxShadow: 'rgba(0, 0, 0, 0.75) 2px 2px 5px 0px',
        ...(style || {}),
      }}
    >
      {children}
    </div>,
    document.body
  );
};
