type TNonNullable<T> = Exclude<T, null>;
type TNonFalsy<T> = Exclude<T, null | undefined>;