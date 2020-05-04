export function prependLines(prefix) {
    return (text) => `${prefix}${text.trim().split("\n").join(`\n ${prefix}`)}\n`;
}
