import { createAction } from 'appraisejs-utils/redux';

export const AUTHENTICATE = 'AUTHENTICATE';

export const setAuthentication = (tokenType, token) => {
  return createAction(AUTHENTICATE, {
    token,
    tokenType,
  });
};

export const clearAuthentication = () => setAuthentication(null, null);
