export type Value = string | number | boolean | void;
export type Mapping = Record<string | number, unknown>;
export type Argument = Value | Mapping | Argument[];
export type Classnames = (...args: Argument[]) => string;

const isStringOrNumber = (type: string, value: unknown): value is string | number => {
    return type === 'string' || type === 'number';
};

const isObject = (type: string, value: unknown): value is Mapping => {
    return type === 'object';
};

const isArrayAndNotEmpty = <T>(value: unknown): value is Array<T> => {
    return Array.isArray(value) && value.length > 0;
};

const isOriginalObject = (value: Mapping) => {
    return Object.prototype.toString === value.toString;
};

const isOwnAndValueValid = <T extends Mapping, K extends keyof T>(object: T, key: K) => {
    return Object.prototype.hasOwnProperty.call(object, key) && object[key];
};

const classnames: Classnames = (...args) => {
    const classes: string[] = [];
    args.forEach((value) => {
        const type = typeof value;
        if (isStringOrNumber(type, value)) {
            classes.push(String(value));
        } else if (isArrayAndNotEmpty(value)) {
            // 因为 args 实际上是会把参数自动装载到一个数组中的, 如果这里 value 不解构的话, 传进去之后里面就还是一个二维数组, 就会无限循环
            classes.push(classnames(...value));
        } else if (isObject(type, value)) {
            if (isOriginalObject(value)) {
                for (const key in value) {
                    if (isOwnAndValueValid(value, key)) {
                        classes.push(key);
                    }
                }
            } else {
                classes.push(value.toString());
            }
        }
    });
    return classes.join(' ');
};

export default classnames;
