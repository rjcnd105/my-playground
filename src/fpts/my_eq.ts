/***
 * Eq
 * 동등성을 나타냄
 * 다음과 같은 원칙을 충족시켜야한다.
 * 1. Reflexivity: E.equals(a, a) === true
 * 2. Symmetry: E.equals(a, b) === E.equals(b, a)
 * 3. Transitivity: if E.equals(a, b) === true and E.equals(b, c) === true, then E.equals(a, c) === true
 *
 ***/

import * as EQ from 'fp-ts/Eq'
import * as Opt from 'fp-ts/Option'
import * as N from 'fp-ts/number'
import * as B from 'fp-ts/boolean'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/lib/function'

// Option에서 사용되는 예
const optNumEq = Opt.getEq(N.Eq)
optNumEq.equals(Opt.some(10), Opt.some(1)) /*?*/ // false
optNumEq.equals(Opt.some(10), Opt.none) /*?*/ // false
optNumEq.equals(Opt.some(5), Opt.some(5)) /*?*/ // true

// Eq combinators example
export function getEq<A>(E: EQ.Eq<A>): EQ.Eq<ReadonlyArray<A>> {
  /*** fromEquals(f): Eq ***/
  // 새로운 Eq를 만든다.
  return EQ.fromEquals(
    (xs, ys) =>
      xs.length === ys.length && xs.every((x, i) => E.equals(x, ys[i]))
  )
}

export const eqNumber: EQ.Eq<number> = {
  equals: (x, y) => x === y,
}

// derived
// Eq<ReadonlyArray<number>>
export const eqNumbers: EQ.Eq<ReadonlyArray<number>> = getEq(eqNumber)

eqNumbers.equals([1, 4, 2], [1, 4, 2]) /*?*/ // true
eqNumbers.equals([1, 4, 2], [1, 4, 3]) /*?*/ // false

// derived
// Eq<ReadonlyArray<ReadonlyArray<number>>>
export const eqNumbersNumbers: EQ.Eq<ReadonlyArray<
  ReadonlyArray<number>
>> = getEq(eqNumbers)

eqNumbersNumbers.equals([[1, 4]], [[1, 4]]) /*?*/ // true
eqNumbersNumbers.equals([[1, 4]], [[1, 5]]) /*?*/ // false

// derived
// Eq<ReadonlyArray<ReadonlyArray<ReadonlyArray<number>>>>
export const eqNumbersNumbersNumbers = getEq(eqNumbersNumbers)

eqNumbersNumbersNumbers.equals([[[1, 4]], [[4, 2]]], [[[1, 4]], [[4, 2]]]) /*?*/ // true
eqNumbersNumbersNumbers.equals([[[1, 4]], [[4, 2]]], [[[1, 4]], [[4, 4]]]) /*?*/ // false

// contramap
export const contramap = <A, B>(f: (b: B) => A) => (E: EQ.Eq<A>): EQ.Eq<B> =>
  EQ.fromEquals((x, y) => E.equals(f(x), f(y)))

export interface User {
  id: number
  name: string
}

export const eqUser: EQ.Eq<User> = pipe(
  N.Eq,
  contramap((user: User) => user.id)
)

export const eqUsers: EQ.Eq<Array<User>> = RA.getEq(eqUser)
