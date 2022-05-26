import * as RTE from 'fp-ts/lib/ReaderTaskEither'
import * as RT from 'fp-ts/lib/ReaderTask'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import * as IO from 'fp-ts/lib/IO'
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import * as R from 'fp-ts/lib/Reader'
import * as ID from 'fp-ts/lib/Identity'
import { apply, flow, identity, pipe } from 'fp-ts/lib/function'
import axios, { AxiosResponse } from 'axios'
import { reduce } from 'fp-ts/lib/Foldable'
import { composeWithCurriedFunction } from '../fptsUtils/composeWithCurriedFunction'
import { flow2 } from '../utils/flow2/flow2'
import { sequenceS } from 'fp-ts/lib/Apply'


O.ApT /*?*/
pipe(
  O.ApT,

)


const ff2 = ({val1, val2 }: {val1: number, val2: number}) =>
  ({key}: {key: string}) =>
    ({data: `${key}: ${val1}, ${val2}` })

const f = pipe(ff2, ID.ap({val1: 1, val2: 2}), ID.ap({key: 'a'}))


const ff =  sequenceS(O.Monad)({ a: O.some(10), f: O.some(20) }) /*?*/
if(O.isSome(ff)) {
  ff.value /*?*/
}

const oo = flow(
  O.apS('age', O.some(3)),
  O.apS('name', O.some('gggruru'))
)
oo(O.none) /*?*/
oo(O.some({})) /*?*/

sequenceS(O.Monad)({
  name: pipe(
    'name',
    O.fromPredicate(stringUtils.isNotEmptyStr)
  ),
  token: pipe(
    _getSessionData(SESSION_KEYS.NAME),
    O.fromPredicate(stringUtils.isNotEmptyStr)
  ),
})