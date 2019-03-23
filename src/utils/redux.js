export const createAction = (type, fields) => ({
  type,
  ...fields,
});

export const FETCHING = 'fetching';
export const FETCHED = 'fetched';

export const createDataState = (status, data, error) => ({ status, data, error });
