import * as React from 'react';
import { GraphQLErrorDisplay, AnyGraphQLLoadMode } from '@spotlightdata/ne-graphql';
import { LoadingBox, Loading } from '@spotlightdata/ne-components';

export interface GraphQLLoadModeRenderProps<T> {
  spinner?: 'box' | 'regular';
  loadingClass?: string;
  mode: AnyGraphQLLoadMode<T>;
  render(data: T, state: AnyGraphQLLoadMode<T>['state']): React.ReactElement;
  notFound?: React.ComponentType;
}

const NotFound = () => {
  return <div>404 Not found</div>;
};

export function GraphQLLoadModeRender<T>({
  mode,
  render,
  spinner = 'box',
  loadingClass,
  notFound = NotFound,
}: GraphQLLoadModeRenderProps<T>): React.ReactElement {
  if (mode.state === 'failed') {
    return <GraphQLErrorDisplay errors={mode.errors} />;
  } else if (mode.state === 'loading') {
    return spinner === 'box' ? (
      <LoadingBox className={loadingClass} />
    ) : (
      <Loading className={loadingClass} />
    );
  } else if (mode.state === 'not-found') {
    const Comp = notFound;
    return <Comp />;
  }
  return render(mode.data, mode.state);
}
