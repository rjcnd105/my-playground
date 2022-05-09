import * as R from 'fp-ts/lib/Reader'
import * as IO from 'fp-ts/lib/IO'
import { flow, pipe } from 'fp-ts/lib/function'
import { ask, chain, map } from 'fp-ts/lib/Reader'

// Reader Monad (A -> A, A -> B)
// 함수에서의 Dependence Inject 를 위해 Reader 모나드를 사용
// 아주 단순하지만 함수에서의 Dependence Inject는 굉장히 강력하다.
type Reader<R, A> = (r: R) => A
interface Dependencies {
  i18n: {
    [k in Switch]: string
  }
}

const instance: Dependencies = {
  i18n: {
    true: 'vero',
    false: 'falso',
  },
}

/*** Reader을 사용하지 않았을 때 ***/

// before
const f1 = (b: boolean): string => (b ? 'true' : 'false')
const g1 = (n: number): string => f1(n > 2)
const h1 = (s: string): string => g1(s.length + 1)

// after
// f 함수가 하나의 인자를 추가로 받게 기능이 변경된다면, f를 사용하는 모든 함수를 변경해야한다.
const f2 = (b: boolean, deps: Dependencies): string =>
  b ? deps.i18n.true : deps.i18n.false
const g2 = (n: number, deps: Dependencies): string => f2(n > 2, deps) // ok
const h2 = (s: string, deps: Dependencies): string => g2(s.length + 1, deps)
// 함수가 바뀔 때마다 위와 같이 모든 함수를 수정해 주어야한다.

/*** Reader을 사용했을 때 ***/

// Reader<Dependencies, string>은 Dependencies -> string의 사상을 의미
// f 함수의 Reader 내용이 바뀌더라도 f함수를 사용하는 g, h 함수를 변경할 필요가 없다.
const f =
  (b: boolean): Reader<Dependencies, string> =>
  (deps) =>
    b ? deps.i18n.true : deps.i18n.false
const g = (n: number) => f(n > 2)
const h = (s: string) => g(s.length + 1)

console.log(h('foo')(instance)) // 'vero'

// ask
// A -> A
// 현재의 컨텍스트 유지
// chain 등, 다른 함수들이랑 함께 조합해서 쓰는 듯. 아니 그냥 Identity잖아?
const strReader = R.ask<string>() //?
strReader('aaa') //

// asks
// A -> B
// 컨텍스트 변경
const numToStrReader = R.asks((n: number) => `read: ${n}`)
numToStrReader(10) //?

type Switch = 'true' | 'false'

const getItem =
  (key: string): IO.IO<string> =>
  () =>
    '{"name": "hoejun"}'
const getParsedItem = flow(getItem, IO.map(JSON.parse))
