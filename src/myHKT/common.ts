export interface Struct<T> { readonly _tag: T }
export type ImplClass<T> = Omit<T, keyof Struct<any>>