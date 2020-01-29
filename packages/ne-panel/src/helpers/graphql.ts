import { SortOrder } from 'antd/lib/table';
import { deCamelize } from '@spotlightdata/ne-helpers';

/**
 * Used to convert antd sorting specification to a standard sorting
 * enum for graphql/postgres
 */
export function sortEnumOf(field: string, order: SortOrder): string {
  const appendix = order === 'ascend' ? 'ASC' : 'DESC';
  return deCamelize(field).toUpperCase() + '_' + appendix;
}
