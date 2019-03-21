import { chain } from 'lodash';

export function appendUrlParams(url, params) {
  const query = chain(params)
    .map((value, key) => `${key}=${value}`)
    .join('&')
    .value();

  return `${url}?${query}`;
}
