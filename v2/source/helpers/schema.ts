import { ObjectSchema, ValidateOptions } from 'yup';

export type ValidateSchemaResp = null | { [path: string]: string };
export function validateSchema<T extends Object>(
  schema: ObjectSchema<T>,
  data: T,
  options?: ValidateOptions
): ValidateSchemaResp {
  let error = null;
  try {
    schema.validateSync(data, options);
  } catch (e) {
    error = { [e.path]: e.message };
  }
  return error;
}
