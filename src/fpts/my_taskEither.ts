import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import * as N from 'fp-ts/lib/number'
import * as S from 'fp-ts/lib/string'
import { flow, pipe } from 'fp-ts/lib/function'
import axios from 'axios'
import * as R from 'fp-ts/lib/Reader'
import { Response } from 'node-fetch'
import * as RTE from 'fp-ts/lib/ReaderTaskEither'
import IoT from 'io-ts'
import { sequenceS } from 'fp-ts/lib/Apply'

/*
 * TaskEither<E, A>
 * 비동기적으로 Either(실패, 성공) 자료형을 반환할 것에 대한 타입
 * Task<Either<E, A>>와도 같은데, 굉장히 일반적인 조합이라 아예 TaskEither<E, A>로 있다.
 * type Task<T> = () => Promise<T> 인데 Either와 합쳐졌으니
 * type TaskEither<E, A> = () => Promise<Either<E, A>>이고 이는
 * type TaskEither<E, A> = () => Promise<{ _tag: "left", value: E } | { _tag: "right", value: A }>
 * 와 같다.
 *
 * Task를 왜 쓰냐?
 * 절대 실패하지 않는다. (TaskEither의 경우 실패했을때에 대한 처리를 따로 둔다.)
 * promise의 경우 성공은 then, 실패는 catch로 잡아야한다. 이는 프로그램이 어디서 실패했는지 알기 힘들고, 프로그램의 흐름에서 벗어난다.
 * 그러나 Task는 이를 감싸어 성공했을때에 대한 처리, 실패했을때에 대한 처리를 내부적으로 거쳐 하나의 흐름으로 돌아와 다시 프로그래머의 통제하에 들어올 수 있게 한다.
 * 위와 같이 하나의 흐름을 통해 통제하기 쉬우므로, 함수를 합성하기 간단하여 생산성이 올라가고 에러처리가 쉽다.
 * Task는 Promise를 반환하는 함수이므로 실행을 원하는 때에 할 수 있다.
 * */

const symA: unique symbol = Symbol('a')
const symB: unique symbol = Symbol()
type Uni = {
  type: 'AAA'
}

function f(arg: any): arg is Uni {
  return arg.type === 'AAAA'
}

const f1 = f({ f: symB })
const f2 = f({ f: symA })
const aaaa = { type: 'AAA' }
const f3 = f(aaaa)

function aa() {
  if (!f(aaaa)) {
    return
  }
  aaaa // Uni
}

// const bbb = new Blob([JSON.stringify({ name: 'gggruru' })], {
//   type: 'application/json',
// })
const myTask: TE.TaskEither<Error, Response> = TE.tryCatch(
  () => axios.get('https://jsonplaceholder.typicode.com/todos/1'),
  E.toError
)

async function test() {
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
  // ##Rule1
  // TaskEither의 tryCatch를 이용하여 promise를 task로 변환하라.

  console.log('task data', await myTask())

  const myChain = TE.chain((response: Response) =>
    TE.tryCatch(() => response.json(), E.toError)
  )

  E.toUnion(E.right('aa')) /*?*/
  E.toUnion(E.left('aa')) //?

  // pipe내부에서 선언하면 초기 값 들어간 것 까지 해서 타입추론을 함.
  const d = pipe(
    myTask,
    TE.chain((response) => TE.tryCatch(() => response.json(), E.toError))
  )() //?

  // map을 활용하여 right인 경우에만 right에 처리를 할 수 있음
  const d2 = pipe(
    myTask,
    TE.map(async (res) => (await res.json()) as { a: 30 })
  ) //?

  // 위와 같다.
  TE.chain((response: Response) =>
    TE.tryCatch(() => response.json(), E.toError)
  )(myTask)

  // pipe, flow의 좋은 점은 함수와 값을 다 미리 넘기기 때문에 타입추론(ReturnType)을 다 해두어 일일히 타입 선언을 하지 않아도 됌
  // pipe는 초기 인자 값을 넣고 시작하는거라 볼 수 있음
  const mypipe = pipe(
    10,
    (n: number): number => n * 10,
    <T>(v: T) => `result: ${v}`
  )
  // flow는 초기값을 pipe처럼 아무 값이 아닌 함수를 받아야한다.
  const myflow = flow(
    (n: number): number => n * 10,
    <T>(v: T) => `result: ${v}`
  )

  mypipe /*?*/
  myflow(10) /*?*/
}

// Reader
// 단순히 A -> B 를 의미한다.
const myReader: R.Reader<number, string> = (a: number) => String(a)
myReader(10) //?

class HttpClient {
  get(url: string) {
    return new Response(url, {})
  }
}

function teTest() {
  /*
   * 비동기 프로그래밍을 함에 있어 필요한 3가지
   * Reader - for dependency injection.
   * Task - for asynchronous things.
   * Either - for things that can go wrong.
   * */
  const d2 = pipe(
    myTask,
    TE.map(async (res) => (await res.json()) as { a: 30 })
  )
}

const eq = E.getEq(S.Eq, N.Eq)

const expected = 135345
const mytask = TE.tryCatch(() => Promise.resolve(expected), String)
const result = await mytask()
console.log(result)
console.log(eq.equals(result, E.right(expected)))

const expected2 = 'Dummy error'
const mytask2 = TE.tryCatch(() => Promise.reject(expected2), String)
const result2 = await mytask2()
console.log(result2)
console.log(eq.equals(result2, E.left(expected2)))

//  Reader + Task + Either = ReaderTaskEither

// Reader: HttpClient -> Either<string, Response>
type MyRTE = RTE.ReaderTaskEither<HttpClient, string, Response>

const fetchUser =
  (userId: string): MyRTE =>
  (client: HttpClient) =>
    TE.tryCatch(
      async () =>
        client.get(`https://jsonplaceholder.typicode.com/users/${userId}`),
      String
    )

const user1Fetcher = fetchUser('1')
const getUser1 = user1Fetcher(new HttpClient()) //?
getUser1() //?

// 위의 내용을 pipe로 해보자.

const decodeString = (v: unknown) => IoT.string.decode(String(v))
decodeString(2) //?
decodeString(Promise.resolve()) //?

IoT.string.decode(2) //?

const ll = IoT.number.decode(['fuck', []]) //?
if (E.isLeft(ll)) console.log('!!', ll.left[0]?.context)
const aaaaaa = flow(E.map((d) => `${d}`))
// aaaaaa(13) //?

const getUser =
  (client: HttpClient): RTE.ReaderTaskEither<string, Error, Response> =>
  (id: string) =>
    TE.tryCatch(async () => client.get(`user/${id}`), E.toError)

// 위는 아래와 같다
// type MyTryCatch = (url: string) => Reader<HttpClient, TE.TaskEither<string, Response>>
// type MyTryCatch = (url: string) => Reader<HttpClient, Task<Either<string, Response>>

interface A {
  a: number
  b: number
  c: number
}

interface B {
  c: number
}

const a = TE.right<Error, A>({ a: 123, b: 456, c: 0 })
const b = TE.right<Error, B>({ c: 789 })

// TaskEither 합성
const c: TE.TaskEither<Error, A> = pipe(
  TE.Do,
  TE.apS('a', a),
  TE.apS('b', b),
  TE.map(({ a, b }) => ({ ...a, ...b }))
) /*?*/

a() //?
b() //?
c() //?
await c() /*?*/

pipe(
  E.left('aaa'),
  E.alt(() => E.left('!'))
) /*?*/

let d = pipe(
  RTE.left('Fail'),
  RTE.alt(() => RTE.left('Tried again and failed')),
  RTE.alt(() => RTE.right(42)),
  RTE.alt(() => RTE.left('This will never run'))
) /*?*/
await d({})() /*?*/ // { _tag: "Right", value: 42 }

sequenceS

const rte: RTE.ReaderTaskEither<boolean, string, number> = pipe(
  RTE.ask<boolean>(),
  RTE.chainEitherK((r: boolean) => (r ? E.right(42) : E.left('oops')))
)

// 여기에서 true는 Reader을 통해 DI 되는 값
rte(true)() /*?*/

const F = pipe(
  RTE.right(42),
  RTE.map((n: number) => n.toString())
) /*?*/
