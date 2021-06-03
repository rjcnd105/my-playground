/***
 * Eq
 * 동등성을 나타냄
 * 다음과 같은 원칙을 충족시켜야한다.
 * 1. Reflexivity: E.equals(a, a) === true
 * 2. Symmetry: E.equals(a, b) === E.equals(b, a)
 * 3. Transitivity: if E.equals(a, b) === true and E.equals(b, c) === true, then E.equals(a, c) === true
 *
 * 다른 인스턴스에 보편적으로 사용된다.
 ***/

import * as EQ from 'fp-ts/Eq'
import * as Opt from 'fp-ts/Option'
import * as N from 'fp-ts/number'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/lib/function'

// Option에서 사용되는 예
const numEq = Opt.getEq(N.Eq)
numEq.equals(Opt.some(10), Opt.some(1)) /*?*/ // false
numEq.equals(Opt.some(10), Opt.none) /*?*/ // false
numEq.equals(Opt.some(5), Opt.some(5)) /*?*/ // true

// combinators example
export function getEq<A>(E: EQ.Eq<A>): EQ.Eq<ReadonlyArray<A>> {
  return EQ.fromEquals(
    (xs, ys) =>
      xs.length === ys.length && xs.every((x, i) => E.equals(x, ys[i]))
  )
}

export const eqNumber: EQ.Eq<number> = {
  equals: (x, y) => x === y,
}

// derived
export const eqNumbers: EQ.Eq<ReadonlyArray<number>> = getEq(eqNumber)

eqNumbers.equals([1, 4, 2], [1, 4, 2]) /*?*/ // true
eqNumbers.equals([1, 4, 2], [1, 4, 3]) /*?*/ // false

// derived
export const eqNumbersNumbers: EQ.Eq<ReadonlyArray<
  ReadonlyArray<number>
>> = getEq(eqNumbers)

eqNumbersNumbers.equals([[1, 4]], [[1, 4]]) /*?*/ // true
eqNumbersNumbers.equals([[1, 4]], [[1, 5]]) /*?*/ // false

// derived
export const eqNumbersNumbersNumbers: EQ.Eq<ReadonlyArray<
  ReadonlyArray<ReadonlyArray<number>>
>> = getEq(eqNumbersNumbers)

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
