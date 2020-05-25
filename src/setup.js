const defaultOptions = () => ({
    sanitizeClassNames: true,
    normalize: true,
    stringifyFunction: null,
});

const _options = defaultOptions();

export const setup = (options) => {
    Object.assign(_options, defaultOptions(), options);
};

export const getOptions = () => _options;
