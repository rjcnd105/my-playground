// object 값들의 타입을 추출
export type ValueOf<T> = T[keyof T]
// M 에 N 타입 덮어쓰기
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N
// map, forEach
export type CallbackFnT1<V, U> = (value: V, index: number, array: V[]) => U
// filter, some, every
export type CallbackFnT2<V> = (value: V, index: number, array: V[]) => boolean
// reduce, reduceRight
export type CallbackFnT3<V, U> = (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => U
