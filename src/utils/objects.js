import camelcase from 'camelcase';
import { reduce } from 'lodash/collection';
import { isPlainObject } from 'lodash/lang';

export const toCamelCaseKeys = (obj, recursive = false) => (
  reduce(obj, (acc, value, key) => {
    const newKey = camelcase(key);
    const newValue = (recursive && isPlainObject(value)) ? toCamelCaseKeys(value, true) : value;

    acc[newKey] = newValue;
    return acc;
  }, {})
);
