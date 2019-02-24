import { createAction } from 'appraisejs-utils/redux';

export const AUTHENTICATE = 'AUTHENTICATE';

export const setAuth = (tokenType, token) => (
  createAction(AUTHENTICATE, {
    token,
    tokenType,
  })
);

export const clearAuth = () => setAuth(null, null);
