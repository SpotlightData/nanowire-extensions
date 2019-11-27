import * as React from 'react';
import * as vega from 'vega';

import { Vega } from '../Vega';
import { createWordCloundSchema } from '../../charts';
import { Row } from 'antd';
import ContainerDimensions from 'react-container-dimensions';
import { VegaProps } from 'react-vega/lib/Vega';

interface Word {
  text: string;
  value: number;
}

export type WordcloudPassDownProps = Omit<VegaProps, 'spec'>;

export interface WordcloudProps extends WordcloudPassDownProps {
  words: Word[];
  height?: number;
  width?: number;
}

const vIfZero = (v1: number, v2: number) => (v1 === 0 ? v2 : v1);

export const Wordcloud: React.FC<WordcloudProps> = ({
  height: defaultHeight = 300,
  width: defaultWidth = 300,
  words,
  ...rest
}) => {
  return (
    <Row type="flex" style={{ height: defaultHeight }}>
      <ContainerDimensions>
        {({ width: w, height: h }) => {
          const height = vIfZero(h, defaultHeight);
          const width = vIfZero(w, defaultWidth);
          // @ts-ignore
          vega.setRandom(vega.randomLCG(0));
          return (
            <Vega
              {...rest}
              spec={createWordCloundSchema({
                width,
                height,
                values: words.map(n => ({ text: n.text, count: n.value })),
              })}
            />
          );
        }}
      </ContainerDimensions>
    </Row>
  );
};
