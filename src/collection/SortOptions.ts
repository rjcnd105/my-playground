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
  construct(predFn: PredicateFn<T>) {
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

type PredRecord<T> = Record<string, PredicateFn<T>>

const predRecordSym = Symbol('predRecord')

class SortOptions<T> {
  private [predRecordSym]: PredRecord<T>
  constructor(predRecord: PredRecord<T>) {
    this[predRecordSym] = predRecord
  }
}
