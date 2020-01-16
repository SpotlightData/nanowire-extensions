import * as React from 'react';
import { GraphQLErrorDisplay, AnyGraphQLLoadMode } from '@spotlightdata/ne-graphql';
import { NotFound, LoadingBox, Loading } from '@spotlightdata/ne-components';

export interface GraphQLLoadModeRenderProps<T> {
  spinner?: 'box' | 'regular';
  loadingClass?: string;
  mode: AnyGraphQLLoadMode<T>;
  render(data: T, state: AnyGraphQLLoadMode<T>['state']): React.ReactElement;
}

export function GraphQLLoadModeRender<T>({
  mode,
  render,
  spinner = 'box',
  loadingClass,
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
    return <NotFound />;
  }
  return render(mode.data, mode.state);
}
