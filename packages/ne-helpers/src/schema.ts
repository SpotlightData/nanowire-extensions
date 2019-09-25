import { ValidateOptions, Schema } from 'yup';

export type ValidateSchemaResp = null | [string, string];
export function validateSchema<T>(
  schema: Schema<T>,
  data: T,
  options?: ValidateOptions
): ValidateSchemaResp {
  let error = null;
  try {
    schema.validateSync(data, options);
  } catch (e) {
    error = [e.path, e.message];
  }
  return error;
}
