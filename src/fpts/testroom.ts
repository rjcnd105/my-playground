import * as RTE from 'fp-ts/lib/ReaderTaskEither'
import * as RT from 'fp-ts/lib/ReaderTask'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
import * as R from 'fp-ts/lib/Reader'
import * as ID from 'fp-ts/lib/Identity'
import { Response } from 'node-fetch'
import { apply, flow, identity, pipe } from 'fp-ts/lib/function'
import axios, { AxiosResponse } from 'axios'
import { reduce } from 'fp-ts/lib/Foldable'
import { composeWithCurriedFunction } from '../fptsUtils/composeWithCurriedFunction'
import { flow2 } from '../fptsUtils/flow2'

interface ApiError {
  code: number
  message: string
}

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}
// await axios.get('https://jsonplaceholder.typicode.com/todos/1') /*?*/

// https://jsonplaceholder.typicode.com/todos/1

// flow(
//   TE.tryCatch(
//   () => axios.get(`https://jsonplaceholder.typicode.com/todos/1`),
//   (err) => err
//   ),
//   TE.match(() => )
// ) /*?*/

// const getUserExecute: RT.ReaderTask<Todo['userId'], never> = (todoId) =>

const f = () => {
    return axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
  }
const getTodo: RTE.ReaderTaskEither<
  string,
  ApiError,
  AxiosResponse<Todo>
> = (todoId) =>
    TE.tryCatch(
      () => {
        console.log(todoId)
        return axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      },
      (r) => {
        console.log(r)
        return {
          code: 333,
          message: 'fail',
        } as ApiError
      }
    )


const myTask1 = getTodo('1')() /*?*/


// 하나로 모으기 TaskEither<ApiError, AxiosResponse<Todo>> -> Task<Response>
const t11 = await pipe(
  getTodo('10'),
  TE.match(
    (apiError) => new Response('FAIL URL'),
    (res) => new Response('SUCCESS URL')
  )
) /*?*/


const ff2 = ({val1, val2 }: {val1: number, val2: number}) =>
  ({key}: {key: string}) =>
      ({data: `${key}: ${val1}, ${val2}` })

const getResult = ({data}: {data: string}) => `result: ${data}`

// 이렇게 쓰기 넘 지저분하고 싫어요.
const myComposedFn1 = (a1: {val1: number, val2: number}) => flow(ff2(a1), getResult)

const f24 = apply(flow)

// 이런식으로 내가 함수 합성을 하고 싶은 곳에서 싶은데... fold 함수를 어떻게 구성해야할까요?
// const myComposeFn2 = composeWithCurriedFunction(ff2,  getResult)
const myComposeFn2 = flow2(ff2,  getResult)

myComposedFn1({val1: 10, val2: 30})({key: '10원, 100원 동전 갯수'})
myComposeFn2({val1: 10, val2: 30})({key: '10원, 100원 동전 갯수'})


const chainFn = <Args extends ReadonlyArray<unknown>, R>
(fn: (...args: Args) => R) => (...args: Args) => fn(...args)


const aaa = flow(ff2,f => (...args: Parameters<typeof f>) => ({data: f(...args)}))
// const aaa = flow(ff2,  chainFn, v => ({data: v}))
aaa({val: 10})({key: 'ddd'}) /*?*/

const f1 = (a: number) => (b: string) => a.toString() === b
const f2 = (c: boolean) => (d: string) => (e: string) => c ? d : e
const f3 = composeWithCurriedFunction(ff2, getResult)


// Is there a good way to synthesize a higher-order function as the second return value?
//
// The flow here uses the fp-ts flow, but it seems to be the same with the lodash flow.

const ff = ({val }: {val: number}) => ({key}: {key: string}) => `${key}: ${val}`

// OK, But I don't want to write messy code like this.
const bb1 = (...args: Parameters<typeof ff>) => flow(ff(...args), v => ({data: v}))

// flow2 and fold is a non-existent virtual function.
// With this feeling, i want to be able to simply compose the second return value of a higher-order function. Any good way?
// const bb2 = flow2(ff, v => ({data: v}))
// or
// const bb3 = flow(ff, fnBind, v => ({data: v}))

bb1({val: 100})({ key: 'money' }) // { data: 'money 100' }
// I hope can use it like bb1 above.
// bb2({val: 100})({ key: 'money' })



function t1() {
  pipe(RTE)
}

t1()


export default {}
