import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import {pipe} from "fp-ts/lib/function";

/*
* TaskEither<E, A>
* 비동기적으로 Either(실패, 성공) 자료형을 반환할 것에 대한 타입
* Task<Either<E, A>>와도 같은데, 굉장히 일반적인 조합이라 아예 TaskEither<E, A>로 있다.
* type Task<T> = () => Promise<T> 인데 Either와 합쳐졌으니
* type TaskEither<E, A> = () => Promise<Either<E, A>>이고 이는
* type TaskEither<E, A> = () => Promise<{ _tag: "left", value: E } | { _tag: "right", value: A }>
* 와 같다.
* */

// ##Rule1
// TaskEither의 tryCatch를 이용하여 promise를 task로 변환하라.
const myfetch = async () => new Response(new Blob(),
    {status: 200, statusText: 'success!!!'})


const myTask: TE.TaskEither<Error, Response> = TE.tryCatch(
    () => fetch('https://jsonplaceholder.typicode.com/todos/1'),
    E.toError
)

pipe(myTask, TE.chain(response => TE.tryCatch(() => response.json(), E.toError)))
// 위와 같다.
TE.chain((response: Response) => TE.tryCatch(() => response.json(), E.toError))(myTask)


// pipe의 좋은 점은 함수와 값을 다 미리 넘기기 때문에 타입추론(ReturnType)을 다 해두어 일일히 타입 선언을 하지 않아도 됌
const mypipe = pipe(10, (n: number): number => n * 10, <T>(v: T) => `result: ${v}`)
mypipe /*?*/


const fff = myTask()
const a: unique symbol = Symbol('a')
const b: unique symbol = Symbol()
type Uni = {
    type: 'AAA'
}

function f(arg: any): arg is Uni {
    return arg.type === 'AAAA'
}

const f1 = f({f: b}) /*?*/
const f2 = f({f: a}) /*?*/
const aaaa = {type: 'AAA'}
const f3 = f(aaaa) /*?*/
function aa() {
    if (!f(aaaa)) {
        return
    }
    aaaa // Uni
}