export const createAction = (type, fields) => ({
  type,
  ...fields,
});

export const UNFETCHED = 'UNFETCHED';
export const FETCHING = 'FETCHING';
export const FETCHED = 'FETCHED';

export const createDataState = (status, data, error) => ({ status, data, error });
