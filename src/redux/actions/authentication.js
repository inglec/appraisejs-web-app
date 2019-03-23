import { createAction } from 'appraisejs-utils/redux';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const createLogin = (tokenType, token) => (
  createAction(LOGIN, {
    token,
    tokenType,
  })
);

export const logout = createAction(LOGOUT);
