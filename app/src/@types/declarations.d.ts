type TNonNullable<T> = Exclude<T, null>;
type TNonFalsy<T> = Exclude<T, null | undefined>;
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };