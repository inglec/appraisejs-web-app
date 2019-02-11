import camelcase from 'camelcase';
import _ from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const toCamelCaseKeys = (obj, recursive = false) => (
  _.reduce(obj, (acc, value, key) => {
    const newKey = camelcase(key);
    const newValue = (recursive && _.isPlainObject(value)) ? toCamelCaseKeys(value, true) : value;

    acc[newKey] = newValue;
    return acc;
  }, {})
);
