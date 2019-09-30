import * as R from 'ramda';
import { Spec, Signal, Data, Mark } from 'vega';

export interface WordCloudValue {
  text: string;
  count: number;
}

interface WordCloudSchemaConfig {
  values: WordCloudValue[];
  width: number;
  height: number;
}

export function createWordCloundSchema(
  config: WordCloudSchemaConfig
): Spec & { signals: Signal[]; data: Data[]; marks: Mark[] } {
  return {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    width: config.width,
    height: config.height,
    data: [
      {
        name: 'table',
        values: config.values,
      },
    ],
    signals: [
      {
        name: 'select',
        description: 'select the text within wordcloud',
        value: null,
        on: [{ events: 'text:click', update: 'datum' }],
      },
    ],
    scales: [
      {
        name: 'color',
        type: 'ordinal',
        domain: {
          data: 'table',
          field: 'text',
        },
        range: ['#d5a928', '#652c90', '#939597'],
      },
    ],
    marks: [
      {
        type: 'text',
        from: {
          data: 'table',
        },
        encode: {
          enter: {
            text: {
              field: 'text',
            },
            align: {
              value: 'center',
            },
            baseline: {
              value: 'alphabetic',
            },
            fill: {
              scale: 'color',
              field: 'text',
            },
          },
          update: {
            fillOpacity: {
              value: 1,
            },
          },
          hover: {
            fillOpacity: {
              value: 0.5,
            },
          },
        },
        transform: [
          {
            type: 'wordcloud',
            size: [config.width, config.height],
            text: {
              field: 'text',
            },
            fontSize: {
              field: 'datum.count',
            },
            fontSizeRange: [12, 56],
            padding: 2,
          },
        ],
      },
    ],
  };
}
