import * as RTE from 'fp-ts/lib/ReaderTaskEither'
import * as RT from 'fp-ts/lib/ReaderTask'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
import { flow, pipe } from 'fp-ts/lib/function'
import axios, { AxiosResponse } from 'axios'

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
    pipe(TE.tryCatch(
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
    ),
        TE.map(res => res.data),

    )

const myTask1 = getTodo('1')() /*?*/


// await getTodo('3')() /*?*/
 

function t1() {
  pipe(RTE)
}

t1()

export default {}