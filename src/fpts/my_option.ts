/*
 * 개념
 *
 * *** Option (https://gcanti.github.io/fp-ts/modules/Option.ts.html) ***
 * Some과 None으로 나뉘어지는 것. 있음과 없음의 개념
 * @see https://rinthel.github.io/rust-lang-book-ko/ch06-01-defining-an-enum.html?highlight=Option#option-%EC%97%B4%EA%B1%B0%ED%98%95%EA%B3%BC-null-%EA%B0%92-%EB%B3%B4%EB%8B%A4-%EC%A2%8B%EC%9D%80-%EC%A0%90%EB%93%A4
 * 위의 링크를 보면 왜 null, undefined 대신 Option을 써야하는지 잘 알려준다.
 * 그리고 여러 iterator, 다른 인터페이스와 상호작용으로 훨신 강력하게 사용할 수 있다.
 * */

import * as Opt from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/function'

/*** Constructor ***/

// type Option<A> = None | Some<A>
// * None의 인스턴스는 none
// * Some의 인스턴스는 some
// * isSome, isNone으로 체크 가능
Opt.some(1) /*?*/
Opt.none /*?*/

/* fromPredicate */
// 조건식에 통과되면 some(통과된 value) 아니면 none인 함수를 반환
const greaterThen10 = Opt.fromPredicate((d: number) => d > 10)

greaterThen10(15) // some(15)
greaterThen10(5) // none

/* ap(opt<A>)((opt<A>) => opt<B>) */
// apply: 1. 값이 바인딩 되어 있고, 2. 그 바인딩된 값을 처리할 함수를 넘김
// 바인딩된 값이 none인 경우 어떤 함수던 none
// some인 경우에만 처리됨

const apN3 = Opt.ap(Opt.some(3))
const apNone = Opt.ap(Opt.none)
apN3(Opt.none) /*?*/
apN3(Opt.some((n) => n * 10)) /*?*/
apN3(Opt.some((n) => (n < 5 ? 0 : 10))) /*?*/ // 0
apNone(Opt.some((v) => 10)) /*?*/ // none
apNone(Opt.some((n) => n * 10)) /*?*/ // none

/*** destructors ***/

/* match(onNone, onSome) */
// none일때와 some일때와 분기 처리.
const matchOption = Opt.match(
  () => 'a none',
  (a) => `a some containing ${a}`
)
matchOption(Opt.some(10)) /*?*/ // a some containing 10
matchOption(Opt.none) /*?*/ // a none

/* getOrElse(onNone) */
// some이 있으면 some의 값을, none이면 onNone의 리턴 값을 줌
const getOrElseFn = Opt.getOrElse(() => 'hoejun')
getOrElseFn(Opt.some('kang')) /*?*/ // kang
getOrElseFn(Opt.some('im')) /*?*/ // im
getOrElseFn(Opt.none) /*?*/ // hoejun

/*** Guards ***/

Opt.isSome(Opt.some(1)) /*?*/ // => true
Opt.isNone(Opt.none) /*?*/ // => true

/*** interop ***/

/* fromNullable(v) */
// null, undefined => none
// value => some(value)

Opt.fromNullable(undefined) /*?*/ // none
Opt.fromNullable(null) /*?*/ // none
Opt.fromNullable(10) /*?*/ // some(10)
Opt.fromNullable('hi') /*?*/ // some(hi)

/* toNullable, toUndefined */
Opt.toNullable(Opt.none) /*?*/ // null
Opt.toUndefined(Opt.none) /*?*/ // undefined

/* fromNullableK(f) */
// fromNullable의 고차함수 버전
const stringOptionFn = Opt.fromNullableK((v) =>
  typeof v === 'string' ? v : null
)
stringOptionFn(10) /*?*/ // none
stringOptionFn('hihi') /*?*/ // some('hihi')

/* tryCatch(f) */
// throw 되면 none, 아니면 반환된 값(v)이 some(v)

Opt.tryCatch(() => {
  throw new Error()
}) /*?*/ // none
Opt.tryCatch(() => {
  return 10
}) /*?*/ // some(10)

/* tryCatchK(f)(v) */
// tryCatch의 고차함수 버전
const f = Opt.tryCatchK((v: number) => {
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
const numEq = Opt.getEq(N.Eq)
numEq.equals(Opt.some(10), Opt.some(1)) /*?*/ // false
numEq.equals(Opt.some(10), Opt.none) /*?*/ // false
numEq.equals(Opt.some(5), Opt.some(5)) /*?*/ // true

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
// 뭐하는 앤지 모르겠음..
Opt.Do /*?*/ // some({})

/* exists(f)(v) */
// pred를 받은 후 Option을 받아 some안의 value를 검증함

const graterThan1 = Opt.exists((n: number) => n >= 1)

graterThan1(Opt.some(3)) /*?*/ // true
graterThan1(Opt.some(0)) /*?*/ // false
graterThan1(Opt.none) /*?*/ // false

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
