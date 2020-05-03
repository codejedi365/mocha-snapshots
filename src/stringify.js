const getOptions = require('./setup').getOptions
const prettyFormat = require('pretty-format');
const ReactElement = prettyFormat.plugins.ReactElement;
const ReactTestComponent = prettyFormat.plugins.ReactTestComponent;

function ignoreNulls(key, value) {
  if (value === null) return undefined
  return value
}

module.exports = function stringify(obj, native = false) {
  if (native) {
  	if (typeof obj === "string") {
      return obj;
    } else {
      // ignoreNulls pre-process?
      return prettyFormat(obj, {
      	plugins: [ReactElement, ReactTestComponent],
      });
    }
  } else {
    let fn = getOptions().stringifyFunction
    if(fn === JSON.stringify) {
      return JSON.stringify(obj, ignoreNulls, '  ')
    } else {
      return getOptions().stringifyFunction(obj, ignoreNulls, '  ')
    }
  }
};
