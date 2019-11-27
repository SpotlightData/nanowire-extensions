import * as React from 'react';
import {
  GraphQLLoadUpdateMode,
  GraphQLErrorDisplay,
  GraphQLLoadMode,
} from '@spotlightdata/ne-graphql';
import { NotFound, LoadingBox, Loading } from '@spotlightdata/ne-components';

type AnyLoadMode<T> = GraphQLLoadUpdateMode<T> | GraphQLLoadMode<T>;

export interface GraphQLLoadModeRenderProps<T> {
  spinner?: 'box' | 'regular';
  mode: AnyLoadMode<T>;
  render(data: T, state: AnyLoadMode<T>['state']): React.ReactElement;
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
