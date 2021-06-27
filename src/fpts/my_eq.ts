/***
 * Eq
 * 동등성을 나타냄
 * 다음과 같은 원칙을 충족시켜야한다.
 * 1. Reflexivity: E.equals(a, a) === true
 * 2. Symmetry: E.equals(a, b) === E.equals(b, a)
 * 3. Transitivity: if E.equals(a, b) === true and E.equals(b, c) === true, then E.equals(a, c) === true
 ***/

import * as EQ from 'fp-ts/Eq'
import * as Opt from 'fp-ts/Option'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import * as ReadonlyArr from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/lib/function'

/*** fromEquals(f): Eq ***/
// !!!중요!!!: fromEquals로 만들었을때는 값이 같으면 기본적으로 true
// + 조건식의 값이 같으면 true (equals)
// 에 해당하는 새로운 Eq를 만든다.
const plus5Eq1: EQ.Eq<number> = {
  equals(x, y) {
    return x + 5 === y
  },
}
const plus5EqFromFromEquals = EQ.fromEquals<number>((x, y) => x + 5 === y)

// 차이점에 주목!
plus5Eq1.equals(3, 3) /*?*/ // false
plus5EqFromFromEquals.equals(3, 3) /*?*/ // true
plus5Eq1.equals(3, 8) /*?*/ // true
plus5EqFromFromEquals.equals(3, 8) /*?*/ // true

// Option에서 사용되는 예
const optNumEq = Opt.getEq(N.Eq)
optNumEq.equals(Opt.some(10), Opt.some(1)) /*?*/ // false
optNumEq.equals(Opt.some(10), Opt.none) /*?*/ // false
optNumEq.equals(Opt.none, Opt.none) /*?*/ // true
optNumEq.equals(Opt.some(5), Opt.some(5)) /*?*/ // true

interface Item {
  id: number
  name: string
}

const eqXPlusOneIsY = EQ.fromEquals<Item>((x, y) => x.id === y.id)
eqXPlusOneIsY.equals({ id: 1, name: '펜' }, { id: 2, name: '펜' }) /*?*/ // false
eqXPlusOneIsY.equals({ id: 1, name: '펜' }, { id: 1, name: '중고 펜' }) /*?*/ // true

/***
 * combinator
 * A => A
 * 기존 형태(A)를 유지하며 새로운 A를 만듬
 ***/
// Eq combinators example
// Eq<A> -> Eq<A[]>
export function getEq<A>(E: EQ.Eq<A>): EQ.Eq<ReadonlyArray<A>> {
  return EQ.fromEquals(
    (xs, ys) =>
      xs.length === ys.length && xs.every((x, i) => E.equals(x, ys[i]))
  )
}

// number 비교
export const eqNumber: EQ.Eq<number> = {
  equals: (x, y) => x === y,
}

// number[] Eq로 확장
// eqNum: Eq<ReadonlyArray<number>>
export const eqNumbers = getEq(eqNumber)

eqNumbers.equals([1, 4, 2], [1, 4, 2]) /*?*/ // true
eqNumbers.equals([1, 4, 2], [1, 4, 3]) /*?*/ // false

// number[][] Eq로 확장
// eqNumbers: Eq<ReadonlyArray<ReadonlyArray<number>>>
export const eq2dNumbers = getEq(eqNumbers)

eq2dNumbers.equals([[1, 4]], [[1, 4]]) /*?*/ // true
eq2dNumbers.equals([[1, 4]], [[1, 5]]) /*?*/ // false

// number[][][] Eq로 확장
// Eq<ReadonlyArray<ReadonlyArray<ReadonlyArray<number>>>>
export const eq3dNumbers = getEq(eq2dNumbers)

eq3dNumbers.equals([[[1, 4]], [[4, 2]]], [[[1, 4]], [[4, 2]]]) /*?*/ // true
eq3dNumbers.equals([[[1, 4]], [[4, 2]]], [[[1, 4]], [[4, 4]]]) /*?*/ // false

// contravariant (https://hackage.haskell.org/package/contravariant-1.4.1/docs/Data-Functor-Contravariant.html#g:3)
// 대표적인 구현체 메소드로는 contramap이 있다.
// 반 공변적으로 적용
// contramap(B -> A) -> (F<A>) -> F<B>
// contramap은 여기서 아주 친절하게 설명이 되어 있다.
// https://medium.com/@stephaneledorze/the-contravariant-functor-a7ae93e2eae0

// ~ EQ.contramap
export const contramap =
  <A, B>(f: (b: B) => A) =>
  (E: EQ.Eq<A>): EQ.Eq<B> =>
    EQ.fromEquals((x, y) => E.equals(f(x), f(y)))

export interface User {
  id: number
  name: string
}

// ~ contramap((user: User) -> user.id)(N.Eq)
export const eqUser: EQ.Eq<User> = pipe(
  N.Eq,
  contramap((user: User) => user.id)
)
// EQ에 내장되어 있는 contramap 사용
export const eqUserName: EQ.Eq<User> = pipe(
  S.Eq,
  EQ.contramap((user: User) => user.name)
)

// ReadonlyArray에 있는 getEq 활용하여 derived
export const eqUsers = ReadonlyArr.getEq(eqUser)
export const eq2dUsers = ReadonlyArr.getEq(eqUsers)
export const eq3dUsers = ReadonlyArr.getEq(eq2dUsers)
