// object 값들의 타입을 추출
import { typeSafeAssign } from '../../utils'

export type Constructor<T = any, argT extends any[] = any[]> = new (
  ...args: [...argT]
) => T

export type AbstractConstructor<
  T = any,
  argT extends any[] = any[]
> = abstract new (...args: [...argT]) => T

type GetConstructorProps<TBase> = TBase extends new (props: infer P) => any
  ? P
  : never

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

export type CollectionIntersection<Arr extends any[]> = UnionToIntersection<
  Arr[number]
>

// export type CtorsParamIS<T extends Constructor[]> = T extends [...T]
//   ? [...UnionToIntersection<T>]
//   : never

type test12312 = CollectionIntersection<[{ a: 20; b: 30 }, { c: 30 }]> // {a:20, b:30} & {c:30}
export interface ClassT extends Function {
  new (...args: any): any
}

class AA {
  constructor({ a, b }: { a: number; b: number }) {}
}

class BB {
  constructor({ c }: { c: string }) {}
}

type eadsf = ConstructorParameters<typeof AA>

export type AAA<U> = U extends any ? (k: U) => void : never

type d = AAA<'d' | 'dd'>

type ArrIntersection<A> = (A extends any[] ? (a: A) => void : never) extends (
  k: [...infer T]
) => void
  ? T[number]
  : never

type fds = ArrIntersection<[1, 2, 3]>

const arr = [{ a: 20, b: 30 }, { c: 40 }]
type A = typeof arr[0]
type B = UnionToIntersection<A>
type C = UnionToIntersection<'A' | 10>
type D = UnionToIntersection<{ a: 20 } | { b: 30 }>

const d = typeSafeAssign({ a: 20, b: 30 }, { c: 30 })
const d2 = typeSafeAssign(1, 's')
// collection
// export type Collection<
//   T extends Dictionary<K, V>,
//   K extends keyof T,
//   V extends ValueOf<T>
// > = T[]
//
// const dic: Dictionary = { a: 30, b: 22 }
