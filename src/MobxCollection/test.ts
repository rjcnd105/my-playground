// import { OrderedMap } from "immutable";
//
// const OrderedMap()

export function iterator<T>(source: Iterable<T>): Iterator<T> {
  return source[Symbol.iterator]()
}

// iterator()

const myIter = {
  *[Symbol.iterator]() {
    yield 1
    yield 2
    yield 3
  },
  entries() {
    return this[Symbol.iterator]()
  },
}
const iter1 = myIter.entries().next() /*?*/
iter1 /*?*/
// iter1.next() /*?*/
// iter1.next() /*?*/

// for (let value of myIter) {
//   console.log(value)
// }

// [...myIter] /*?*/

interface IterableValue<T> {
  index: number
  iter: IterableIterator<T>
}
// const symbol = new Symbol('d')
class MyIterator<T> {
  #iterableValue: IterableIterator<T>
  constructor(iter: IterableIterator<T>) {
    this.#iterableValue = iter
  }
  *[Symbol.iterator](): IterableIterator<T> {}

  static fromIter<T>(iter: IterableIterator<T>): MyIterator<T> {
    return new this(iter)
  }
}

const m = new Map([
  ['a', 1],
  ['b', 2],
])

m.entries().next() /*?*/
m.entries() /*?*/
function iterToArr<T>(iter: IterableIterator<T>) {
  return [...iter]
}
console.log(iterToArr(m.entries()))
console.log(iterToArr(m.values()))
