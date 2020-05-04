import { getOptions } from "./setup";
import prettyFormat from "pretty-format";
const ReactElement = prettyFormat.plugins.ReactElement;
const ReactTestComponent = prettyFormat.plugins.ReactTestComponent;
const Immutable = prettyFormat.plugins.Immutable;

function ignoreNulls(key, value) {
    if (value === null) return undefined;
    return value;
}

export function stringify(obj, native = false) {
    let fn = getOptions().stringifyFunction;
    if (native || fn === null) {
        if (typeof obj === "string") {
            return obj;
        } else {
            // ignoreNulls pre-process?
            return prettyFormat(obj, {
                plugins: [ReactElement, ReactTestComponent, Immutable],
            });
        }
    } else {
        if (fn === JSON.stringify) {
            return JSON.stringify(obj, ignoreNulls, "  ");
        } else {
            return getOptions().stringifyFunction(obj, ignoreNulls, "  ");
        }
    }
}
