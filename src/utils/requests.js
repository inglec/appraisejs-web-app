import _ from 'lodash';

export function appendUrlParams(url, params) {
  const query = _
    .chain(params)
    .map((value, key) => `${key}=${value}`)
    .join('&')
    .value();

  return `${url}?${query}`;
}
