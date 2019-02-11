import { createAction } from 'appraisejs-utils/redux';

export const AUTHENTICATE = 'AUTHENTICATE';

export const setAuthentication = (tokenType, token) => (
  createAction(AUTHENTICATE, {
    token,
    tokenType,
  })
);

export const clearAuthentication = () => setAuthentication(null, null);
