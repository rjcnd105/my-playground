// 값이 never이면 추출이 되지 않는다는 점을 잘 이용하라! 해당 매칭되는 타입을 제외할때 사용

import { ComponentType } from 'react'

/***
 * pattern: {}형태로 만든 후 []로 추출
 * 1. record 형태로 추출 후
 * 2. [keyof T]로 never이 아닌 것만 추출
 ***/
type _FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

interface Part {
  id: number
  name: string
  subparts: Part[]
  updatePart(newName: string): void
}

type T40 = FunctionPropertyNames<Part> // "updatePart"
type T41 = NonFunctionPropertyNames<Part> // "id" | "name" | "subparts"
type T42 = FunctionProperties<Part> // { updatePart(newName: string): void }
type T43 = NonFunctionProperties<Part> // { id: number, name: string, subparts: Part[] }

/***
 * pattern: () => 형태로 extends 후 infer로 인자 추측
 * 함수로 감싼 후(타입 추측을 위해) 다시 풀면서 infer로 타입 추출
 * 인자를 infer로 추출시 여러개의 case시 & 연산으로 됌
 ***/
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

type D = UnionToIntersection<{ a: 20 } | { b: 30 }> // { a: 20 } & { b: 30 }

/***
 * Union -> Array
 ***/
type ValueOf<T> = T[keyof T]

type NonEmptyArray<T> = [T, ...T[]]

type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never

const enumerate =
  <T>() =>
  <U extends NonEmptyArray<T>>(...elements: MustInclude<T, U>) =>
    elements

type Color = 'red' | 'blue'

enumerate<Color>()('red', 'blue') // ✅ Good
enumerate<Color>()('blue', 'red')
// enumerate<Color>()('blue') // Error

/**
 * Returns tuple types that include every string in union
 * TupleUnion<keyof { bar: string; leet: number }>;
 * ["bar", "leet"] | ["leet", "bar"];
 */

type TupleUnion<U extends string, R extends any[] = []> = {
  [S in U]: Exclude<U, S> extends never ? [...R, S] : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U];

interface Person {
  firstName: string
  lastName: string
  dob: Date
  hasCats: false
}
type keys = TupleUnion<keyof Person> //  ["firstName", "lastName", "dob", "hasCats"] | ... 22 more ... | [...]

const k: keys = ['firstName', 'lastName', 'dob', 'hasCats']

type UnionToTuple<T> = (
  (T extends any ? (t: T) => T : never) extends infer U
    ? (U extends any ? (u: U) => any : never) extends (v: infer V) => any
      ? V
      : never
    : never
) extends (_: any) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : []



type Tuple = UnionToTuple<
  | 2
  | 1
  | 3
  | 5
  | 10
  | -9
  | 100
  | 1001
  | 102
  | 123456
  | 100000000
  | 'alice'
  | 'charlie'
>

type PageComponent<T = {}> = {
  onMount?(): void
} & ComponentType<T>
