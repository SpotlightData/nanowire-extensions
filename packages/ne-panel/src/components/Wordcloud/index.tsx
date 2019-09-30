import * as React from 'react';
import * as vega from 'vega';
import { GraphQLLoadMode, GraphQLErrorHandler } from '@spotlightdata/ne-graphql';
import { Loading, LoadingBox } from '@spotlightdata/ne-components';
import { withSignal } from '@spotlightdata/ne-helpers';

import { Vega } from '../../components';

import ContainerDimensions from 'react-container-dimensions';
// @ts-ignore
import useDeepCompareEffect from 'use-deep-compare-effect';
import { createWordCloundSchema } from '../../charts';
import { DocumentNode } from 'graphql';
import { useCancelableApolloClient } from '../../hooks';

interface WordCloudValue {
  count: number;
  text: string;
}

interface WordcloudProps<D, V> {
  onFail: GraphQLErrorHandler;
  variables: V;
  query: DocumentNode;
  transform: (data: D) => WordCloudValue[];
  onSelect(term: string | undefined): void;
}

type WordcloudLoadMode =
  | GraphQLLoadMode<WordCloudValue[]>
  | { state: 'updating'; data: WordCloudValue[] };

function useController<D, V>({
  onFail,
  onSelect,
  variables,
  query,
  transform,
}: WordcloudProps<D, V>) {
  const client = useCancelableApolloClient();
  const [mode, setMode] = React.useState<WordcloudLoadMode>({ state: 'loading' });

  useDeepCompareEffect(() => {
    // Reset keyword
    onSelect(undefined);
    if (mode.state === 'loaded') {
      return setMode({ state: 'updating', data: mode.data });
    }
    setMode({ state: 'loading' });
  }, [variables]);

  React.useEffect(() => {
    if (!(mode.state === 'loading' || mode.state === 'updating')) {
      return;
    }
    return client.query<D, V>({
      query,
      variables,
      onFail,
      onData(data) {
        setMode({ state: 'loaded', data: transform(data) });
      },
    });
  }, [mode.state]);
  return { words: mode };
}

export function WordcloudBare<D, V>(props: WordcloudProps<D, V>): React.ReactElement {
  const { onSelect } = props;
  const { words } = useController(props);

  const handleSelect = withSignal((signal: string, node: WordCloudValue) => {
    onSelect(node.text);
  });

  if (!(words.state === 'loaded' || words.state === 'updating')) {
    return <LoadingBox />;
  }
  return (
    <div>
      {words.state === 'updating' && <Loading />}
      <ContainerDimensions>
        {({ width }) => {
          // @ts-ignore
          vega.setRandom(vega.randomLCG(0));
          return (
            <Vega
              spec={createWordCloundSchema({
                width,
                height: 300,
                values: words.data,
              })}
              data={{ table: words.data }}
              signalListeners={{ select: handleSelect }}
            />
          );
        }}
      </ContainerDimensions>
    </div>
  );
}
