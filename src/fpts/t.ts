// 1. 옵션으로 준 값이 적합하지 않으면 원 배열 적용
// 2. 값이 없으면 원 배열 적용

import { Either, left } from 'fp-ts/Either'
import { Functor, Functor1 } from 'fp-ts/Functor'
import { none, of, Option, some, Some } from 'fp-ts/Option'
import { invert, Ordering, sign } from 'fp-ts/Ordering'
import { Monoid } from 'fp-ts/Monoid'

some(1) /*?*/

none /*?*/

type t = Monoid<Ordering>

const bool2Ordering = (b: boolean): Ordering => (b ? 1 : -1)
const ordering2Bool = (ordering: Ordering): boolean => {
  if (ordering === 1) return true
  return false
}

invert(1) /*?*/

const d = [3, 6, 3, 9, 1, 3]
d.sort((a, b) => {
  console.log(a, b)
  return bool2Ordering(a > b)
}) /*?*/
