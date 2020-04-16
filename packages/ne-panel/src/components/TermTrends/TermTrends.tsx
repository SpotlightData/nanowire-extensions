import * as React from 'react';
import {
  GraphQLLoadUpdateMode,
  GraphQLErrorDisplay,
  useCancelableApolloClient,
} from '@spotlightdata/ne-graphql';
import { DatePicker, Loading, LoadingBox, Dropdown } from '@spotlightdata/ne-components';
import { DocumentNode } from 'graphql';
import { LineChartValue } from '../../charts';
import { TermTrendsFilters, TermResult } from './interface';
import { fillKeywordGaps } from './utils';
import { Row, Menu, Button } from 'antd';
// @ts-ignore
import useDeepCompareEffect from 'use-deep-compare-effect';

export interface DateRange {
  min: number;
  max: number;
}

type Spacing = 'day' | 'week' | 'month' | 'year';

interface TermTrendsProps<D> extends TermTrendsFilters {
  query: DocumentNode;
  transform: (data: D) => TermResult[];
  spacing?: Spacing;
  truncation?: string;
  hasValues: string[];
  children: (values: LineChartValue[], date: DateRange) => React.ReactNode;
  withDate?: boolean;
  withSpacing?: boolean;
}

type TermsMode = GraphQLLoadUpdateMode<LineChartValue[]>;

const spacingOptions: { [key in Spacing]: { text: string } } = {
  year: { text: 'Year' },
  month: { text: 'Month' },
  week: { text: 'Week' },
  day: { text: 'Day' },
};

function useController<D>(props: TermTrendsProps<D>) {
  const client = useCancelableApolloClient();
  const [mode, setMode] = React.useState<TermsMode>({ state: 'loading' });
  const [spacing, setSpacing] = React.useState<Spacing>(props.spacing || 'month');

  const sVal = props.startDate.valueOf();
  const eVal = props.endDate.valueOf();
  const [date, setDate] = React.useState<DateRange>({
    min: sVal,
    max: eVal,
  });

  const variables = {
    hasType: props.hasType,
    hasValues: props.hasValues,
    startDate: new Date(date.min),
    endDate: new Date(date.max),
    spacing: `1 ${spacing}`,
    truncation: spacing,
  };

  React.useEffect(() => {
    setDate({
      min: sVal,
      max: eVal,
    });
  }, [sVal, eVal]);

  useDeepCompareEffect(() => {
    if (mode.state === 'loaded') {
      setMode({ state: 'updating', data: mode.data });
    } else {
      setMode({ state: 'loading' });
    }
  }, [variables]);

  React.useEffect(() => {
    if (!(mode.state === 'updating' || mode.state === 'loading')) {
      return;
    }
    return client.query<
      D,
      TermTrendsFilters & {
        hasValues: string[];
        spacing: string;
        truncation: string;
      }
    >({
      query: props.query,
      variables,
      onData: data => {
        const all = props.transform(data);
        const filled = fillKeywordGaps(all, props.hasValues)
          .map(n => {
            return {
              date: Date.parse(n.datePublished),
              count: parseInt(n.hasCount, 10),
              text: n.hasValue as string,
            };
          })
          .sort((a, b) => a.text.localeCompare(b.text));
        setMode({ state: 'loaded', data: filled });
      },
      onFail: errors => setMode({ state: 'failed', errors }),
      // @ts-ignore
      overrides: {},
    });
  }, [mode.state]);

  return { terms: mode, date, setDate, spacing, setSpacing };
}

export function TermTrends<D>(props: TermTrendsProps<D>): React.ReactElement {
  const { terms, date, setDate, spacing, setSpacing } = useController(props);

  if (terms.state === 'failed') {
    return <GraphQLErrorDisplay errors={terms.errors} />;
  }

  if (terms.state === 'loading') {
    return <LoadingBox />;
  }

  let values: LineChartValue[] = [];
  if (terms.state === 'updating' || terms.state === 'loaded') {
    values = terms.data;
  }

  let datePicker: React.ReactNode = null;
  const withDate = props.withDate !== undefined ? props.withDate : true;

  if (withDate) {
    datePicker = (
      <div style={{ marginRight: '2em' }}>
        <DatePicker minValue={date.min} maxValue={date.max} onFinished={setDate} />
      </div>
    );
  }

  let spacingPicker: React.ReactNode = null;
  const withSpacing = props.withSpacing !== undefined ? props.withDate : true;
  if (withSpacing) {
    spacingPicker = (
      <Dropdown
        options={spacingOptions}
        value={spacing}
        onChange={key => setSpacing(key as Spacing)}
        label="Choose Spacing"
      />
    );
  }

  return (
    <React.Fragment>
      <Row type="flex" style={{ marginBottom: '1em' }}>
        {datePicker} {spacingPicker}
      </Row>

      <Row>
        {terms.state === 'updating' && <Loading />}
        {props.children(values, date)}
      </Row>
    </React.Fragment>
  );
}
