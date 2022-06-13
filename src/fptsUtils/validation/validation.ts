import { chain } from 'fp-ts/es6/Either'
import { ap, sequenceS } from 'fp-ts/lib/Apply'
import type { Either } from 'fp-ts/lib/Either'
import * as E from 'fp-ts/lib/Either'
import Endo from 'fp-ts/lib/Endomorphism'
import { flow, pipe } from 'fp-ts/lib/function'
import M from 'fp-ts/lib/Monoid'
import type { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { concat } from 'fp-ts/lib/NonEmptyArray'
import type { Predicate } from 'fp-ts/lib/Predicate'
import type { Reader } from 'fp-ts/lib/Reader'
import * as RE from 'fp-ts/lib/ReaderEither'
import * as ReadonlyArr from 'fp-ts/lib/ReadonlyArray'
import { matchE } from 'fp-ts/ReaderEither'

export type Message = string

export type ValidationErrors = {
  readonly value: unknown
  readonly errors: NonEmptyArray<Message>
}

export type Validation<A> = Either<ValidationErrors, A>

// 모든 에러 검출시 사용
export const validator = <A>(pred: Predicate<A>, errorMessage: Message) =>
  E.match<ValidationErrors, A, Validation<A>>(
    left => E.left(pred(left.value as A) ? left : { value: left.value, errors: concat(left.errors)([errorMessage]) }),
    value => (pred(value) ? E.right(value) : E.left({ value, errors: [errorMessage] })),
  )

// 각 identifier당 하나의 에러를 검출할 때
// 일반적인 UI에 쉽게 사용하기 위한 것
export const singleErrorValidator = <A>(pred: Predicate<A>, errorMessage: Message) =>
  E.chain<Message, A, A>(value => (pred(value) ? E.right(value) : E.left(errorMessage)))

// validation을 하기 위해 value로부터 검증 가능한 Either 모나드로 끌어올림
export const liftE = <A>(v: A) => E.of(v)
// struct 형태에 대한 전체 검증
export const validatorS = sequenceS(E.Apply)
