import React from 'react';
import { BreadcrumbManager, Either } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

const makeHistory = spec => ({
  location: {
    pathname: '',
    search: '?',
  },
  listen: () => {
    return () => false;
  },
  ...spec,
});

const makeCrumbsRequest = (left, right) => {
  return () => {
    return {
      subscribe: fn => {
        fn(Either.from(left, right));
        return { unsubscribe: () => false };
      },
    };
  };
};

const make = props =>
  render(
    <MemoryRouter>
      <BreadcrumbManager className="test" basic={false} history={makeHistory()} {...props} />
    </MemoryRouter>
  );

describe('components/managers/BreadcrumbManager', () => {
  describe('BackCrumb', () => {
    it('should allow to use a basic icon crumb', () => {
      const onClick = jest.fn();
      const { container } = make({
        onClick,
        className: 'test',
        icon: 'back-arrow',
        basic: true,
      });
      fireEvent.click(container.querySelector('.test'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('SmartBreadcrumb', () => {
    it('should display retrieved breadcrumbs', () => {
      const crumbs = [
        {
          text: 'baseTest',
          link: '/base/test',
        },
        {
          text: 'test',
          link: '/test',
        },
      ];

      const { queryByText } = make({ getBreadcrumbs: makeCrumbsRequest(false, crumbs) });
      crumbs.map(c => {
        expect(queryByText(c.text)).toBeInTheDocument();
      });
    });

    it('should display nothing if request fails', () => {
      const { container } = make({ getBreadcrumbs: makeCrumbsRequest(true, undefined) });
      expect(container.querySelector('.ant-breadcrumb').childNodes.length).toBe(0);
    });
    it('listend and unlisten to history', () => {
      const unsubscribe = jest.fn();
      const listen = jest.fn().mockReturnValue(unsubscribe);
      const history = makeHistory({
        listen,
      });
      const { unmount } = make({
        history,
        getBreadcrumbs: makeCrumbsRequest(true, false),
      });
      unmount();
      expect(listen).toHaveBeenCalledTimes(1);
      expect(unsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});
