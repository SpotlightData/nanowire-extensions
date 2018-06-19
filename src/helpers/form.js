/**
 * Wrapper to improve yup schema validation
 * @param {Object} schema - Yup schema
 * @param {any} data - Data to be validated by the schema
 */
export function validateYupSchema(schema, data, options) {
  let error;
  try {
    schema.validateSync(data, options);
  } catch (e) {
    error = { [e.path]: e.message };
  }
  return error;
}
