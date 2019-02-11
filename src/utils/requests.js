import _ from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export function appendUrlParams(url, params) {
  const query = _
    .chain(params)
    .map((value, key) => `${key}=${value}`)
    .join('&')
    .value();

  return `${url}?${query}`;
}
