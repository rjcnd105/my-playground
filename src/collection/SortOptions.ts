import { exactPick, typedObjectKeys } from '../utils'

type Ordering = -1 | 0 | 1

const bool2Ordering = (b: boolean): Ordering => (b ? 1 : -1)
const ordering2Bool = (ordering: Ordering): boolean => ordering === 1

const invert = (ordering: Ordering): Ordering => {
  switch (ordering) {
    case 1:
      return -1
    case -1:
      return 1
  }
  return 0
}

interface PredicateFn<T> {
  (item: T): boolean
}

const predSym = Symbol('pred')

class SortOption<T> {
  private [predSym]: PredicateFn<T>
  constructor(predFn: PredicateFn<T>) {
    this[predSym] = predFn
  }
  pred(val: T) {
    return this[predSym](val)
  }
  ordering(val: T) {
    return bool2Ordering(this[predSym](val))
  }
  invertOrdering(val: T) {
    return invert(this.ordering(val))
  }
}

Array
type PredRecord<K extends string, T> = Record<K, PredicateFn<T>>
type RecordKeys<R extends Record<string, unknown>> = keyof R

const predRecordSym = Symbol('predRecord')

interface SortOptionsConstructor {
  new <K extends string, T>(predRecord: Record<K, T>): SortOption<
    PredRecord<K, T>
  >
}

export const SortOptions = {
  new<K extends string, T>(optionObj: PredRecord<K, T>): _SortOptions<K, T> {
    return new _SortOptions<K, T>(optionObj)
  },
}

class _SortOptions<keysT extends string, T> {
  private [predRecordSym]: Record<keysT, SortOption<T>>

  constructor(optionObj: PredRecord<keysT, T>) {
    const predRecord: Partial<Record<keysT, SortOption<T>>> = {}

    for (const optionObjKey in optionObj) {
      predRecord[optionObjKey] = new SortOption<T>(optionObj[optionObjKey])
    }

    this[predRecordSym] = predRecord as Record<keysT, SortOption<T>>
  }

  get pred() {
    return this[predRecordSym]
  }

  predNames() {
    return typedObjectKeys(this[predRecordSym])
  }
}

const preds = {
  myPred1: (item: string) => item.length > 6,
}

const sdsds = new SortOptions.new<string>(preds)

s.pred
s.predNames()

const a = {
  h: 'd',
  h2: 'd',
  h3: 'd',
  h4: 'd',
}

const kk = typedObjectKeys(a)

type s = keyof typeof a
