import { Either, fromPredicate, isLeft, left, match, right } from 'fp-ts/Either'
import { Predicate } from 'fp-ts/lib/Predicate'
import { pipe } from 'fp-ts/lib/function'

export interface ValidationError {
  readonly identifier: string
  readonly message?: string
}

export type ValidationErrors<A> = {
  value: A
  errors: ValidationError[]
}

export type Validation<A> = Either<ValidationErrors<A>, A>

export const validator =
  <A>(pred: Predicate<A>, errorMessage: ValidationError['message']) =>
  (identifier: ValidationError['identifier']) =>
    match<ValidationErrors<A>, A, Validation<A>>(
      ({ value, errors }) =>
        pred(value)
          ? left({ value, errors })
          : left({
              value,
              errors: errors.concat({ message: errorMessage, identifier }),
            }),
      fromPredicate(pred, (value) => ({
        value,
        errors: [{ message: errorMessage, identifier }],
      }))
    )
