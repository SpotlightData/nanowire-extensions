import { deCamelize } from '@spotlightdata/ne-helpers';

/**
 * Used to convert antd sorting specification to a standard sorting
 * enum for graphql/postgres
 */
export function sortEnumOf(field: string, order: 'descend' | 'ascend'): string {
  const appendix = order === 'ascend' ? 'ASC' : 'DESC';
  return deCamelize(field).toUpperCase() + '_' + appendix;
}
