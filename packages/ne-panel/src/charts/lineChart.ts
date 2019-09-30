import * as R from 'ramda';
import { Spec } from 'vega';
import { Signal, Data, Mark } from 'vega-typings/types';

export interface LineChartValue {
  date: number;
  count: number;
  text: string;
}

export interface LineChartSpec {
  values: LineChartValue[];
  height: number;
  width: number;
}

export function createLineChartSchema({
  values,
  height,
  width,
}: LineChartSpec): Spec & { signals: Signal[]; data: Data[]; marks: Mark[] } {
  return {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    height,
    width,
    autosize: {
      type: 'fit',
      resize: true,
    },
    signals: [
      {
        name: 'clear',
        value: true,
        on: [
          {
            events: 'mouseup[!event.item]',
            update: 'true',
            force: true,
          },
        ],
      },
      {
        name: 'shift',
        value: [],
        on: [
          {
            events: '@legendSymbol:click, @legendLabel:click',
            update: 'event.shiftKey',
            force: true,
          },
        ],
      },
      {
        name: 'clicked',
        value: [],
        on: [
          {
            events: '@legendSymbol:click, @legendLabel:click',
            update: '{value: datum.value}',
            force: true,
          },
        ],
      },
    ],
    data: [
      {
        name: 'table',
        values,
        transform: [
          {
            type: 'collect',
            sort: {
              field: 'date',
              order: 'ascending',
            },
          },
        ],
      },
      {
        name: 'selected',
        values: [],
        on: [
          {
            trigger: 'clear',
            remove: true,
          },
          {
            trigger: '!shift',
            remove: true,
          },
          {
            trigger: '!shift && clicked',
            insert: 'clicked',
          },
          {
            trigger: 'shift && clicked',
            toggle: 'clicked',
          },
        ],
      },
    ],
    scales: [
      {
        name: 'x',
        type: 'time',
        range: {
          signal: '[0, width - 40]',
        },
        round: true,
        domain: {
          data: 'table',
          field: 'date',
        },
      },
      {
        name: 'y',
        type: 'linear',
        range: 'height',
        nice: true,
        zero: true,
        domain: {
          data: 'table',
          field: 'count',
        },
      },
      {
        name: 'color',
        type: 'ordinal',
        range: 'category',
        domain: {
          data: 'table',
          field: 'text',
        },
      },
    ],
    axes: [
      {
        orient: 'bottom',
        scale: 'x',
        grid: true,
        title: 'Date',
        domain: false,
        tickCount: { signal: 'ceil(width/80)' },
      },
      {
        orient: 'left',
        scale: 'y',
      },
    ],
    legends: [
      {
        stroke: 'color',
        title: 'Terms',
        encode: {
          title: {
            update: {
              fontSize: {
                value: 14,
              },
            },
          },
          symbols: {
            name: 'legendSymbol',
            interactive: true,
            update: {
              strokeWidth: {
                value: 2,
              },
              opacity: [
                {
                  test: "!length(data('selected')) || indata('selected', 'value', datum.value)",
                  value: 0.7,
                },
                {
                  value: 0.15,
                },
              ],
              size: {
                value: 84,
              },
            },
          },
          labels: {
            name: 'legendLabel',
            interactive: true,
            update: {
              fontSize: {
                value: 13,
              },
              opacity: [
                {
                  test: "!length(data('selected')) || indata('selected', 'value', datum.value)",
                  value: 1,
                },
                {
                  value: 0.25,
                },
              ],
            },
          },
        },
      },
    ],
    marks: [
      {
        type: 'group',
        from: {
          facet: {
            name: 'series',
            data: 'table',
            groupby: 'text',
          },
        },
        marks: [
          {
            type: 'line',
            from: {
              data: 'series',
            },
            encode: {
              enter: {
                x: {
                  scale: 'x',
                  field: 'date',
                },
                y: {
                  scale: 'y',
                  field: 'count',
                },
                stroke: {
                  scale: 'color',
                  field: 'text',
                },
                strokeWidth: {
                  value: 2,
                },
              },
              update: {
                opacity: [
                  {
                    test: "(!length(data('selected')) || indata('selected', 'value', datum.text))",
                    value: 0.7,
                  },
                  {
                    value: 0.15,
                  },
                ],
                stroke: [
                  {
                    test: "(!length(data('selected')) || indata('selected', 'value', datum.text))",
                    scale: 'color',
                    field: 'text',
                  },
                  {
                    value: '#ccc',
                  },
                ],
                interpolate: {
                  value: 'linear',
                },
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
          },
        ],
      },
    ],
  };
}
