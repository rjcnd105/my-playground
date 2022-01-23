/***
 * Ord
 * Order 할때 그 Ord 맞다.
 * 비교기를 통해 Ordering(1 | 0 | -1)를 반환한다.
 * 나중에 배울 semigroup, monoid와 결합하여 여러 Ord들을 결합하여 1순위, 2순위, ... 정렬을 할 수 있다.
 ***/

import * as Ord from 'fp-ts/lib/Ord'
import * as EQ from 'fp-ts/Eq'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import * as Semi from 'fp-ts/Semigroup'
import { Ordering } from 'fp-ts/Ordering'

const numCompare = (x: number, y: number): Ordering => {
  if (x > y) return -1
  if (x < y) return 1
  return 0
}

// 직접 구현
const numOrdDesc: Ord.Ord<number> = {
  equals: (x, y) => x === y,
  // ~ equals: (x, y) => numCompare(x, y) === 0,
  compare: numCompare,
}

/*** reverse ***/
// Ordering 반전
const numOrdAsc = Ord.reverse(numOrdDesc)

const numArr = [1, 7, 2, 8, 4, 9, 5, 3, 6]
numArr.sort(numOrdDesc.compare) /*?*/ // [9, 8, 7, 6, 5, 4, 3, 2, 1]
numArr.sort(numOrdAsc.compare) /*?*/ // [1, 2, 3, 4, 5, 6, 7, 8, 9]

/***
 * fromCompare<T>
 * (compare(T, T)) -> Ord<T>
 ***/
const numOrd2 = Ord.fromCompare(numCompare) // Ord<number>

/***
 * equalsDefault<T>
 * (compare(T, T)) -> equal(T, T)
 ***/
const numEq: EQ.Eq<number> = EQ.fromEquals(Ord.equalsDefault(numCompare)) // Eq<number>

/***
 * tuple<T1, T2, ...>
 * (Ord<T1>, Ord<T2>, ...) -> Ord<[T1, T2, ...]>
 ***/
const tupleOrd: Ord.Ord<readonly [number, string]> = Ord.tuple(N.Ord, S.Ord)

tupleOrd.compare([1, 'f'], [1, 'a']) /*?*/ // 1
tupleOrd.compare([1, 'f'], [1, 'f']) /*?*/ // 0
tupleOrd.compare([1, 'd'], [1, 'f']) /*?*/ // -1
tupleOrd.compare([1, 'd'], [3, 'a']) /*?*/ // -1
tupleOrd.equals([1, 'd'], [1, 'd']) /*?*/ // true

class User {
  constructor(readonly name: string, readonly age: number) {}
}

const 가영 = new User('가영', 14)
const 나영 = new User('나영', 12)
const 다영 = new User('다영', 14)
const 라영 = new User('라영', 17)
const 마영 = new User('라영', 10)

/***
 * contramap
 * (B -> A) -> (F<A>) -> F<B>
 * 아래 User, age(number)로 치환해보자면
 * (User -> age) -> Ord<age> -> Ord<User>
 ***/
const userAgeOrd = Ord.contramap((user: User) => user.age)(N.Ord)
const userNameOrd = Ord.contramap((user: User) => user.name)(S.Ord)

// Utils
/*** min, max ***/
const getYoungUser = Ord.min(userAgeOrd)
const getOldUser = Ord.max(userAgeOrd)
getYoungUser(가영, 나영) /*?*/ // { name: '나영', age: 12 }
getOldUser(가영, 나영) /*?*/ // { name: '가영', age: 14 }

/*** gt, lt, geq(gt+eq), leq(gt+eq) ***/
const isYounger = Ord.lt(userAgeOrd)
const isOlder = Ord.gt(userAgeOrd)
isYounger(나영, 가영) /*?*/ // true
isOlder(나영, 가영) /*?*/ // false

/*** between, clamp ***/
const isAgeBetween나영to가영 = Ord.between(userAgeOrd)(나영, 가영)
const getUserForAgeClamp나영to가영 = Ord.clamp(userAgeOrd)(나영, 가영)

isAgeBetween나영to가영(다영) /*?*/ // true
isAgeBetween나영to가영(라영) /*?*/ // false

// User의 age가 나영 ~ 가영의 사이면 User반환
// 나영보다 작으면 나영
// 가영보다 크면 가영
getUserForAgeClamp나영to가영(마영) /*?*/ // 나영
getUserForAgeClamp나영to가영(다영) /*?*/ // 다영
getUserForAgeClamp나영to가영(라영) /*?*/ // 가영

// const reverseCompare = (ordering: Ordering): Ordering => {
//   switch (ordering) {
//     case -1:
//       return 1
//     case 0:
//       return 0
//     case 1:
//       return -1
//   }
// }


const userOrdSemi = Ord.getSemigroup<User>()
const myUserOrd = userOrdSemi.concat(userAgeOrd, userNameOrd)
const myUserArr = [가영, 나영, 다영, 라영, 마영].sort(myUserOrd.compare)

myUserArr /*?*/