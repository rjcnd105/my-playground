import type { Predicate } from 'fp-ts/lib/Predicate'
import type { Reader } from 'fp-ts/lib/Reader'

export function isNil(v: unknown) {
  return v === undefined || v === null
}

export const predicate = <T>(pred: Predicate<T>) => pred
