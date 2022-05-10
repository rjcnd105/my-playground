import * as RTE from 'fp-ts/lib/ReaderTaskEither'
import * as RT from 'fp-ts/lib/ReaderTask'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import * as IO from 'fp-ts/lib/IO'
import { pipe } from 'fp-ts/lib/function'
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
await axios.get('https://jsonplaceholder.typicode.com/todos/1') /*?*/

// https://jsonplaceholder.typicode.com/todos/1

const getTodo: RTE.ReaderTaskEither<string, ApiError, AxiosResponse<Todo>> =
  RTE.asks((todoId) =>
    TE.tryCatch(
      () => axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`),
      () => {}
    )
  )


function t1() {
  pipe(RTE)
}

t1()

export default {}