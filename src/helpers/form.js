export function validateSchema(schema, data, options) {
  let error;
  try {
    schema.validateSync(data, options);
  } catch (e) {
    error = { [e.path]: e.message };
  }
  return error;
}
