import { observable } from 'mobx'

export class OrderedMap<T, V> {
  @observable
  private source: Map<T, V>

  constructor(iterableIterator: IterableIterator<[T, V]>) {
    this.source = new Map(iterableIterator)
  }
  entries() {
    return this.source.entries()
  }

  static fromArr<keyT extends ObjKey, valueT extends Record<keyT, unknown>>(
    arr: valueT[],
    keyProperty: keyT
  ) {
    console.log('a')
  }

  get [Symbol.toStringTag]() {
    return 'Ordered Map'
  }

  [Symbol.iterator]() {
    return this.source.entries()
  }
}
new OrderedMap([1, 2, 3, 4].entries()).entries() /*?*/

type ObjKey = string | number | symbol

type d = Record<string, unknown>
