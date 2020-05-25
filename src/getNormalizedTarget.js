import { ShallowWrapper, ReactWrapper } from "enzyme";
import { default as toJson } from "enzyme-to-json";
import { clearClassNames } from "./clearClassNames";
import { normalize } from "./normalize";
import { getOptions } from "./setup";

export function getNormalizedTarget(value) {
    const options = getOptions();

    const isReactComponent = value instanceof ShallowWrapper || value instanceof ReactWrapper;
    const shouldClearClassNames = options.sanitizeClassNames && isReactComponent;

    if (shouldClearClassNames) {
        return clearClassNames(normalize(toJson(value)));
    }

    return isReactComponent ? normalize(toJson(value)) : normalize(value);
}
