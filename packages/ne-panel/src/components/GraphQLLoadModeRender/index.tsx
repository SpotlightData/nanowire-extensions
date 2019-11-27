import * as React from 'react';
import { GraphQLErrorDisplay, AnyGraphQLLoadMode } from '@spotlightdata/ne-graphql';
import { NotFound, LoadingBox, Loading } from '@spotlightdata/ne-components';

export interface GraphQLLoadModeRenderProps<T> {
  spinner?: 'box' | 'regular';
  mode: AnyGraphQLLoadMode<T>;
  render(data: T, state: AnyGraphQLLoadMode<T>['state']): React.ReactElement;
}

export function GraphQLLoadModeRender<T>({
  mode,
  render,
  spinner = 'box',
}: GraphQLLoadModeRenderProps<T>): React.ReactElement {
  if (mode.state === 'failed') {
    return <GraphQLErrorDisplay errors={mode.errors} />;
  } else if (mode.state === 'loading') {
    return spinner === 'box' ? <LoadingBox /> : <Loading />;
  } else if (mode.state === 'not-found') {
    return <NotFound />;
  }
  return render(mode.data, mode.state);
}
