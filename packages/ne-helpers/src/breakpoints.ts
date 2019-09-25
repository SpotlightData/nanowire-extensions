import * as R from 'ramda';

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BreakpointMap = Partial<Record<Breakpoint, number>>;

/**
 * Will set a sibling breakpoint if original breakpoint exists
 * If it encounters 24 size breakpoint, it will assign sibling as 24 as well
 * @param bpts Breakpoints object
 */
const setBpIfExists = (bpts: BreakpointMap) => (name: Breakpoint) => (
  output: BreakpointMap
): BreakpointMap => {
  const value = bpts[name];
  if (value !== undefined) {
    output[name] = 24 - (value < 24 ? bpts[name] : 0);
  }
  return output;
};

/**
 * Will create sibling breakpoints.
 * Assumes that sibling should help fill in the rest of the row
 * @param breakpoints Antd breakpoint map
 */
export function siblingBreakpoints(breakpoints: BreakpointMap): [BreakpointMap, BreakpointMap] {
  const set = setBpIfExists(breakpoints);
  const sibling = R.pipe(
    set('xs'),
    set('sm'),
    set('md'),
    set('lg'),
    set('xl'),
    set('xxl')
  )({});
  return [breakpoints, sibling];
}
