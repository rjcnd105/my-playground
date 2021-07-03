class dataclass<T extends Record<string, any>> {
  constructor(d: Partial<T>) {
    Object.assign(this, d)
  }
}

// 클래스 선언시 함수 못쓰게 할 수 없나...
class A extends dataclass<A> {
  name = ''
  age?: number
  point?: { x: number; y: number }
}
class B extends dataclass<A> {
  phone?: number
  address?: string
}
interface C {
  hobbit?: string
}

new A({ age: 14, point: { x: 30, y: 20 } }) /*?*/

const a: A = { name: 'a' }
const b: B = {}
const c: C = {}

const abc: A & B & C = { name: 'abc' }
