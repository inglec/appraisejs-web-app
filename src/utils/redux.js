export const createAction = (type, fields) => ({
  type,
  ...fields,
});

export const UNFETCHED = 'UNFETCHED';
export const FETCHING = 'FETCHING';
export const FETCHED = 'FETCHED';

export const createDataState = (status = UNFETCHED, data, error) => ({ data, error, status });
