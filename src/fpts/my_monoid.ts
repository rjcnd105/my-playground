/***
 * Monoid
 * semigroup에서 empty가 추가된 개념.
 *
 * Right identity(오른쪽 항등식): concat(x, empty) = x
 * Left identity(왼쪽 항등식): concat(empty, x) = x
 * 그렇기 위해서는 항등원이 필요함.
 *
 * Monoid에서는 항등원(empty)를 넣으면 위의 identity가 지켜진다는 것이 보장되므로,
 * 연산에 대한 안전성?이 보장되는 셈
 * 그러므로 항등원이 있다면 Monoid로 선언하는 것이 좋다.
 * https://www.notion.so/01f55ada5f6548b3a071275a984e03a7#87a3aab453a14c2b9f990acd543f0368
 ***/

import { concatAll, Monoid } from 'fp-ts/lib/Monoid'
import * as S from 'fp-ts/string'
import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { contramap, getMonoid, reverse } from 'fp-ts/Ord'
import { sort } from 'fp-ts/lib/Array'

// <Number, +> 항등원 0
const monoidSum: Monoid<number> = {
  concat: (x, y) => x + y,
  // <number, +>의 항등원 0
  empty: 0,
}

// <Number, *> 항등원 1
const monoidProduct: Monoid<number> = {
  concat: (x, y) => x * y,
  // <number, *>의 항등원 1
  empty: 1,
}

// <string, +> 항등원 ''
const monoidString: Monoid<string> = {
  concat: (x, y) => x + y,
  // <string, +>의 항등원 ''
  empty: '',
}

const monoidAll: Monoid<boolean> = {
  concat: (x, y) => x && y,
  // <boolean, &&>의 항등원 true
  empty: true,
}

const monoidAny: Monoid<boolean> = {
  concat: (x, y) => x || y,
  // <boolean, ||>의 항등원 false
  empty: false,
}

// concatAll을 할때 semigroup에서 했던 것과는 다르게 초기값을 줄 필요가 없음.
concatAll(monoidSum)([1, 2, 3, 4]) /*?*/
concatAll(monoidProduct)([1, 2, 3, 4]) // 24
concatAll(monoidString)(['a', 'b', 'c']) // 'abc'
concatAll(monoidAll)([true, false, true]) // false
concatAll(monoidAny)([true, false, true]) // true

// 다음과 같은 semigroup은 monoid가 될 수 없다.
const semigroupSpace: Semigroup<string> = {
  concat: (x, y) => x + ' ' + y,
}

// semigroupSpace.concat('a', 'b') // 'a b'
semigroupSpace.concat('a', '') // 'a '
semigroupSpace.concat('', 'b') // ' b'

monoidString.concat('a', monoidString.empty) // 'a'
monoidString.concat(monoidString.empty, 'b') // 'b'

interface User {
  readonly id: number
  readonly name: string
  readonly age: number
  readonly rememberMe: boolean
}

const byName = pipe(
  S.Ord,
  contramap((p: User) => p.name)
)

const byId = pipe(
  N.Ord,
  contramap((p: User) => p.id)
)

const byAge = pipe(
  N.Ord,
  contramap((p: User) => p.age)
)

const byRememberMe = pipe(
  B.Ord,
  contramap((p: User) => p.rememberMe)
)

const M = getMonoid<User>() /*?*/

const users: Array<User> = [
  { id: 1, name: 'Guido', age: 47, rememberMe: false },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 4, name: 'Giulio', age: 44, rememberMe: true },
]

// 넣는 순서에 따라 1순위 2순위 정렬이 달라짐... 왜?????
// 결합법칙에 위배되지 않나???
// const ord1 = concatAll(M)([byId])
const ord11 = M.concat(byRememberMe, byId)
const ord12 = M.concat(byId, byRememberMe)
// sort(ord1)(users) /*?*/
sort(ord11)(users) /*?*/
/*
* [ { id: 1, name: 'Guido', age: 47, rememberMe: false },
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 4, name: 'Giulio', age: 44, rememberMe: true } ]
  * */

sort(ord12)(users) /*?*/
/*
* [ { id: 1, name: 'Guido', age: 47, rememberMe: false },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 4, name: 'Giulio', age: 44, rememberMe: true } ]
  * */

// sort by name, then by age, then by `rememberMe`
const ord2 = concatAll(M)([byName, byAge, byRememberMe])
sort(ord2)(users) /*?*/

// now `rememberMe = true` first, then by name, then by age
const ord3 = concatAll(M)([reverse(byRememberMe), byName, byAge])
sort(ord3)(users) /*?*/
