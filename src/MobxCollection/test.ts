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
}

// for (let value of myIter) {
//   console.log(value)
// }

// [...myIter] /*?*/

interface IterableValue<T> {
  index: number
  iter: IterableIterator<T>
}
// const symbol = new Symbol('d')
class MyIterator {
  // #iterableValue
}

const m = new Map([
  ['a', 1],
  ['b', 2],
])
function iterToArr<T>(iter: IterableIterator<T>) {
  return [...iter]
}
console.log(iterToArr(m.entries()))
