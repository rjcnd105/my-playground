import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { flow, pipe } from 'fp-ts/lib/function'
import axios from 'axios'

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
 * */

const a: unique symbol = Symbol('a')
const b: unique symbol = Symbol()
type Uni = {
  type: 'AAA'
}

function f(arg: any): arg is Uni {
  return arg.type === 'AAAA'
}

const f1 = f({ f: b }) /*?*/
const f2 = f({ f: a }) /*?*/
const aaaa = { type: 'AAA' }
const f3 = f(aaaa) /*?*/
function aa() {
  if (!f(aaaa)) {
    return
  }
  aaaa // Uni
}
const bbb = new Blob([JSON.stringify({ name: 'gggruru' })], {
  type: 'application/json',
})

async function test() {
  // ##Rule1
  // TaskEither의 tryCatch를 이용하여 promise를 task로 변환하라.

  const myTask: TE.TaskEither<Error, Response> = TE.tryCatch(
    () => axios.get('https://jsonplaceholder.typicode.com/todos/1'),
    E.toError
  )
  console.log('myTask', myTask)

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
  console.log('=>(my_taskEither.ts:82) ')
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

test()
