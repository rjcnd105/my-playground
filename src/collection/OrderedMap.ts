export class OrderedMap<K, V> {
  #source: Map<K, V>

  constructor(map: Map<K, V>)
  constructor(iterableIterator: IterableIterator<[K, V]>)
  constructor(iterableIterator: IterableIterator<[K, V]> | Map<K, V>) {
    if (iterableIterator instanceof Map) {
      this.#source = iterableIterator
    } else {
      this.#source = new Map(iterableIterator)
    }
  }

  get [Symbol.toStringTag]() {
    return 'Ordered Map'
  }

  get size() {
    return this.#source.size
  }

  static fromArr<
    keyT extends keyof valT,
    valT extends { [key in keyT]: valT[keyT] }
  >(coll: valT[], key: keyT) {
    return new this(new Map(coll.map((value) => [value[key], value])))
  }

  static fromObj<objT extends { [key in ObjKey]: unknown }>(obj: objT) {
    const map = new Map<keyof objT, objT[keyof objT]>()
    for (const key in obj) {
      map.set(key, obj[key])
    }
    return new this(map)
  }

  static fromIter<K, V>(iterableIterator: IterableIterator<[K, V]>) {
    return new this(iterableIterator)
  }

  entries() {
    return this.#source.entries()
  }

  [Symbol.iterator]() {
    return this.#source.entries()
  }

  set(key: K, value: V) {
    this.#source.set(key, value)
    return this
  }

  get(key: K) {
    return this.#source.get(key)
  }

  has(key: K) {
    return this.#source.has(key)
  }

  delete(key: K) {
    this.#source.delete(key)
    return this
  }

  clear() {
    this.#source.clear()
    return this
  }

  toArr() {
    return [...this.#source]
  }

  toValueArr() {
    return [...this.#source.values()]
  }

  toKeyArr() {
    return [...this.#source.keys()]
  }
}

const mockData = [
  { a: 10, b: 's' },
  { a: 30, b: 'ss' },
]
const mockObj = {
  I2413: { a: 10, b: 30 },
  I2443: { a: 10, b: 30 },
}
const orderedMap = OrderedMap.fromArr(mockData, 'a') /*?*/
const orderedMap2 = OrderedMap.fromObj(mockObj) /*?*/
type t = keyof typeof mockData
new OrderedMap([1, 2, 3, 4].entries()).entries() /*?*/

type ObjKey = string | number | symbol

type d = Record<string, unknown>
