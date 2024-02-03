/**
 * # To Kebab Case
 *
 * Converts a string to `kebab-case` by replacing each space or letter capitalization with a dash (-).
 *
 * @param value
 */
export function toKebabCase (value: string = ''): string {
    if (toKebabCase.cache.has(value)) {
        return toKebabCase.cache.get(value)!;
    }
    const kebabValue = value
        .replace(/[^a-z]/gi, '-')
        .replace(/\B([A-Z])/g, '-$1')
        .toLowerCase();
    toKebabCase.cache.set(value, kebabValue);
    return kebabValue;
}
toKebabCase.cache = new Map<string, string>();


/**
 * ## Template Variables
 *
 * May be supplied to `createStringTemplate()` either as default variable replacements
 * or during template execution for variable replacement.
 *
 * @see createStringTemplate
 */
export type TemplateVariables = {
    [variable: string]: number | string;
};


/**
 * # Template Function
 *
 * A template function is returned from `createStringTemplate`, which converts the template
 * into a string, replacing any variables with those contained within the variables supplied.
 *
 * @see createStringTemplate
 */
export type TemplateFunction = (variables?: TemplateVariables) => string;


/**
 * # String Template
 *
 * An approximation of Evance's String Templates.
 *
 * Allows us to build strings as a template with replacement variables.
 *
 * This is inspired by the output tags of EVML and behaves similarly. However, unlike EVML
 * which is compiled this is a simple find and replace template format and variables are only
 * wrapped within single curly brackets e.g. 'Hello { name }'.
 *
 * @param template
 * @param defaultVariables
 */
export function createStringTemplate(
    template: string,
    defaultVariables: TemplateVariables = {}
): TemplateFunction {
    /** Variable lookup pattern */
    const variablePattern = /{([\s\S]+?)}/g;

    return (variables: TemplateVariables = {}) => {
        const dictionary = { ...defaultVariables, ...variables};

        return template.replaceAll(variablePattern, (match, raw): string => {
            const variable = raw.trim();
            if (dictionary[variable] === undefined) {
                console.warn(`Unrecognized template variable '${variable}'.`);
                return `"${variable}"`;
            }
            return dictionary[variable] as string;
        });
    };
}

/**
 * # Pad End
 *
 * @param str
 * @param length
 * @param char
 */
export function padEnd (str: string, length: number, char = '0') {
    return str + char.repeat(Math.max(0, length - str.length))
}


/**
 * # Pad Start
 *
 * @param str
 * @param length
 * @param char
 */
export function padStart (str: string, length: number, char = '0') {
    return char.repeat(Math.max(0, length - str.length)) + str
}