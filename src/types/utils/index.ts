// object 값들의 타입을 추출
export type ValueOf<T> = T[keyof T]
// M 에 N 타입 덮어쓰기
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

export type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export type MapKey<T> = T extends Map<infer K, unknown>
  ? K
  : T extends undefined
  ? undefined
  : unknown

export type MapValue<T> = T extends Map<unknown, infer V>
  ? V
  : T extends undefined
  ? undefined
  : unknown

// |를 &로
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

export interface ClassT extends Function {
  new (...args: any): any
}

// collection
// export type Collection<
//   T extends Dictionary<K, V>,
//   K extends keyof T,
//   V extends ValueOf<T>
// > = T[]
//
// const dic: Dictionary = { a: 30, b: 22 }
