export const createAction = (type, fields) => ({
  type,
  ...fields,
});
