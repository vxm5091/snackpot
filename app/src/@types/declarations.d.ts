type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
type DeepNonNullable<T> = {
  [P in keyof T]: T[P] extends object ? DeepNonNullable<NonNullable<T[P]>> : NonNullable<T[P]>;
};