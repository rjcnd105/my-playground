/*
 * 개념
 *
 * *** Option (https://gcanti.github.io/fp-ts/modules/Option.ts.html) ***
 * Some과 None으로 나뉘어지는 것. 있음과 없음의 개념
 * @see https://rinthel.github.io/rust-lang-book-ko/ch06-01-defining-an-enum.html?highlight=Option#option-%EC%97%B4%EA%B1%B0%ED%98%95%EA%B3%BC-null-%EA%B0%92-%EB%B3%B4%EB%8B%A4-%EC%A2%8B%EC%9D%80-%EC%A0%90%EB%93%A4
 * 위의 링크를 보면 왜 null, undefined 대신 Option을 써야하는지 잘 알려준다.
 * 그리고 여러 iterator, 다른 인터페이스와 상호작용으로 훨신 강력하게 사용할 수 있다.
 * */

import * as O from 'fp-ts/lib/Option'
import * as TO from 'fp-ts/lib/TaskOption'
import * as T from 'fp-ts/lib/Task'
import { flow, pipe } from 'fp-ts/lib/function'

/*** Constructor ***/

// type Option<A> = None | Some<A>
// * None의 인스턴스는 none
// * Some의 인스턴스는 some
// * isSome, isNone으로 체크 가능
O.some(1) /*?*/
O.none /*?*/

/* fromPredicate */
// 조건식에 통과되면 some(통과된 value) 아니면 none인 함수를 반환
const greaterThen10 = O.fromPredicate((d: number) => d > 10)

greaterThen10(15) // some(15)
greaterThen10(5) // none

/* ap(opt<A>)((opt<A>) => opt<B>) */
// apply: 1. 값이 바인딩 되어 있고, 2. 그 바인딩된 값을 처리할 함수를 넘김
// 바인딩된 값이 none인 경우 어떤 함수던 none
// some인 경우에만 처리됨

const apN3 = O.ap(O.some(3))
const apNone = O.ap(O.none)
apN3(O.none) /*?*/
apN3(O.some((n) => n * 10)) /*?*/
apN3(O.some((n) => (n < 5 ? 0 : 10))) /*?*/ // 0
apNone(O.some((v) => 10)) /*?*/ // none
apNone(O.some((n) => n * 10)) /*?*/ // none

/*** destructors ***/

/* match(onNone, onSome) */
// none일때와 some일때와 분기 처리.
const matchOption = O.match(
  () => 'a none',
  (a) => `a some containing ${a}`
)
matchOption(O.some(10)) /*?*/ // a some containing 10
matchOption(O.none) /*?*/ // a none

/* getOrElse(onNone) */
// some이 있으면 some의 값을, none이면 onNone의 리턴 값을 줌
const getOrElseFn = O.getOrElse(() => 'hoejun')
getOrElseFn(O.some('kang')) /*?*/ // kang
getOrElseFn(O.some('im')) /*?*/ // im
getOrElseFn(O.none) /*?*/ // hoejun

/*** Guards ***/

O.isSome(O.some(1)) /*?*/ // => true
O.isNone(O.none) /*?*/ // => true

/*** interop ***/

/* fromNullable(v) */
// null, undefined => none
// value => some(value)

O.fromNullable(undefined) /*?*/ // none
O.fromNullable(null) /*?*/ // none
O.fromNullable(10) /*?*/ // some(10)
O.fromNullable('hi') /*?*/ // some(hi)

/* toNullable, toUndefined */
O.toNullable(O.none) /*?*/ // null
O.toUndefined(O.none) /*?*/ // undefined

/* fromNullableK(f) */
// fromNullable의 고차함수 버전
const stringOptionFn = O.fromNullableK((v) =>
  typeof v === 'string' ? v : null
)
stringOptionFn(10) /*?*/ // none
stringOptionFn('hihi') /*?*/ // some('hihi')

/* tryCatch(f) */
// throw 되면 none, 아니면 반환된 값(v)이 some(v)

O.tryCatch(() => {
  throw new Error()
}) /*?*/ // none
O.tryCatch(() => {
  return 10
}) /*?*/ // some(10)

/* tryCatchK(f)(v) */
// tryCatch의 고차함수 버전
const f = O.tryCatchK((v: number) => {
  if (v < 10) {
    throw Error()
  }
  return v * 2
}) /*?*/
f(5) /*?*/ // none
f(14) /*?*/ // some(28)

/*** instance ***/
// Option => Other Instance

import * as N from 'fp-ts/lib/number'
import { Option } from 'fp-ts/lib/Option'

/* getEq(Eq) */
// Option을 비교하는 Eq(비교기) 인스턴스를 만듬

// 이러면 이제 Eq<Option<number>>가 됨
const numEq = O.getEq(N.Eq)
numEq.equals(O.some(10), O.some(1)) /*?*/ // false
numEq.equals(O.some(10), O.none) /*?*/ // false
numEq.equals(O.some(5), O.some(5)) /*?*/ // true

/*** Model ***/

// interface None {
//   readonly _tag: 'None'
// }
// interface Some<A> {
//   readonly _tag: 'Some'
//   readonly value: A
// }
// type Option<A> = None | Some<A>

/*** Utils ***/

/* Do */
O.Do /*?*/ // some({})

/* exists(f)(v) */
// pred를 받은 후 Option을 받아 some안의 value를 검증함

const graterThan1 = O.exists((n: number) => n >= 1)

graterThan1(O.some(3)) /*?*/ // true
graterThan1(O.some(0)) /*?*/ // false
graterThan1(O.none) /*?*/ // false

// console.log(
//   pipe(
//     O.none,
//     O.map((n) => n * 2)
//   ),
//
//   pipe(
//     O.some(10),
//     O.map((n) => n * 2), // Some인 경우에 적용시킴
//     O.filter((n) => n > 100) // 조건에 맞지 않으면 None
//   )
// )



// T.Task<number>
pipe(TO.of('hihi'), TO.match(() => 0, (str) => str.length))() /*?*/

// T.Task<number>
pipe(TO.of('hihi'), TO.matchE(() => T.of(0), (str) => T.of(str.length)))() /*?*/



O.chainFirst((a: number) => (a % 2 === 0 ? O.some(a) : O.none))(O.some(1)); /*?*/ // => { _tag: 'None' }
O.chainFirst((a: number) => (a % 2 === 0 ? O.some(a * 2) : O.none))(O.some(2)) /*?*/ // => { _tag: 'Some', value: 2 }
O.chainFirst((a: number) => (a % 2 === 0 ? O.some(a) : O.none))(O.none) /*?*/ // => { _tag: 'None' }
O.chain((a: number) => (a % 2 === 0 ? O.some(a) : O.none))(O.some(1)) /*?*/


O.flap(1)(O.some((a) => a * 2)) /*?*/
O.ap(O.of(1))(O.some((a) => a * 2)) /*?*/

pipe(
  O.Do,
  O.apS('age', O.some(3)),
  O.apS('name', O.some('gggruru'))
) // { _tag: 'Some', value: { age: 3, name: 'gggruru } }

O.apS("b", O.some(1))(O.some({ a: 2 })) /*?*/ // { _tag: 'Some', value: { a:2, b: 1} }
O.apS("a", O.some(1))(O.some({ a: 2 })) /*?*/ // { _tag: 'Some', value: { a:1 } }
O.apS("b", O.none)(O.some({ a: 2 })) /*?*/
O.apS("b", O.some(1))(O.none)  /*?*/
