import type { Either } from 'fp-ts/lib/Either'
import { fromPredicate, isLeft, left, match, right } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import type { Predicate } from 'fp-ts/lib/Predicate'

type Identifier = string
type Message = string

export interface ValidationError {
  readonly identifier: Identifier
  readonly message?: Message
}

export type ValidationErrors<A> = {
  value: A
  errors: ValidationError[]
}

export type ValidationErrorMap<A> = {
  value: A
  errorMap: Map<Identifier, Message>
}

export type Validation<A> = Either<ValidationErrors<A>, A>
export type ValidationMap<A> = Either<ValidationErrorMap<A>, A>

// 모든 에러 검출시 사용
export const validator =
  <A>(pred: Predicate<A>, errorMessage: Message) =>
    (identifier: Identifier) =>
      match<ValidationErrors<A>, A, Validation<A>>(
        ({ value, errors }) =>
          pred(value)
            ? left({ value, errors })
            : left({
              value,
              errors: errors.concat({ message: errorMessage, identifier }),
            }),
        fromPredicate(pred, value => ({
          value,
          errors: [{ message: errorMessage, identifier }],
        })),
      )

// 각 필드당 하나의 에러를 검출할 때
// 일반적인 UI에 쉽게 사용하기 위한 것
export const mapValidator =
  <A>(pred: Predicate<A>, errorMessage: Message) =>
    (identifier: Identifier) =>
      match<ValidationErrorMap<A>, A, ValidationMap<A>>(
        ({ value, errorMap }) =>
          errorMap.has(identifier) || pred(value)
            ? left({ value, errorMap })
            : left({
              value,
              errorMap: errorMap.set(identifier, errorMessage),
            }),
        fromPredicate(pred, value => ({
          value,
          errorMap: new Map([[identifier, errorMessage]]),
        })),
      )
