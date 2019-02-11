// eslint-disable-next-line import/prefer-default-export
export const createAction = (type, fields) => ({
  type,
  ...fields,
});
