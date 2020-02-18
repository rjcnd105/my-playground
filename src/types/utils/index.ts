// object 값들의 타입을 추출
export type ValueOf<T> = T[keyof T]
// M 에 N 타입 덮어쓰기
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N
