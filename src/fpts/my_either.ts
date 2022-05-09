/***
 * Either
 * Left, Right로 나뉘어짐.
 * Left는 실패, Right는 성공을 의미.
 * Option이랑 차이점은 Left에 정보를 담을 수 있다.
 * Option은 Either의 구현체 중 하나이며
 * 실패에 대한 대안이 필요할때 Either을 사용함.
 ***/

import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import { pipe } from 'fp-ts/lib/function'

export {}

const number10배 = (v: number) => v * 10
const number100배 = (v: number) => v * 100

const apEx = E.ap(E.of(10))

/* ap */
// 값이 먼저고, 함수는 나중이므로 결정된 값에 대한 처리를 유연하게 바꿀 수 있음.
// 체이닝에 유용함
apEx(E.of(number10배)) /*?*/ // Right 100
apEx(E.of(number100배)) /*?*/ // Right 1000

const result = pipe(
  E.of((dollar: number) => (name: string) => `${name} money: ${dollar * 1250}원`),
  E.ap(E.of(100)),
  E.ap(E.of("hjs"))
)
result /*?*/ // "hjs money: 125000원"

/* map */
// 함수가 먼저고 값은 나중이므로 결정된 함수에 대해 input 값을 유연하게 바꿀 수 있음.
const mapEx = E.map(number10배) 
mapEx(E.right(10)) /*?*/ // Right 100


const d = E.Do /*?*/

const t = T.Do /*?*/
t() /*?*/


const print = (s: string): T.Task<void> => () => Promise.resolve(console.log(s))
declare const readLine: T.Task<string>

const mainDo: T.Task<{ x: string, y: string }> = pipe(
  T.Do,
  T.bind('x', () => readLine),
  T.bind('y', () => readLine),
  T.chainFirst(({ x }) => print(x)),
  T.chainFirst(({ y }) => print(y)),
)
T.bind('x', () => readLine) /*?*/

var aa = E.flap(10) /*?*/
aa(E.of((n: number) => `v: ${n}`)) /*?*/