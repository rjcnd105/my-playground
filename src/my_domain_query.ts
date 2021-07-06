// Response
// 클래스 선언시 함수 못쓰게 할 수 없나...
// import * as res from 'res'

// import { VO } from './res/type'

import { VO } from './res/type'
import { Constructor } from './types/utils'

class A extends VO<A> {
  name = ''
  age?: number
  point?: { x: number; y: number }
}
class B extends VO<B> {
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

const obj = { name: 'aa', zzz: 10 }
// const d: A = { name: 'aa', zzz: 10 } // 이건 안되고
const d: A = obj // 이건 되네 제길,

abstract class DTO<dataT> {
  abstract data: dataT
  abstract api: any
  abstract adapter: any

  constructor(d?: Partial<dataT>) {
    if (d) {
      // @ts-ignore
      console.log('constructor', this.data, d) /*?*/
      // this.data가 abstract라 타입 에러.. 어케 해결하지?
      // @ts-ignore
      Object.assign(this.data, d)
    }
  }

  // new this가 안되고...
  copy(overwrite?: Partial<dataT>): this {
    return new (this.constructor as new (d?: Partial<dataT>) => this)({
      ...this.data,
      ...overwrite,
    })
  }
}

DTO /*?*/

namespace res {
  export class User extends VO<User> {
    id = 1
    name = 'dd'
    age?: number
  }
}

interface DtoParams<dataT, apiT, adapT> {
  data: dataT
  api: apiT
  adapter: adapT
  isEq?: (d1: dataT) => boolean
}
// 함수 인자로 받음으로써 타입 추론과정을 거침(abstract class와 같은 효과를 누림)
function makeDTO<dataT, apiT, adapT>(
  ctor: Constructor<DtoParams<dataT, adapT, apiT>>
) {
  return class _DTO extends ctor {
    constructor(d?: Partial<dataT>) {
      super(d)
      if (d) Object.assign(this.data, d)
    }

    copy(d?: Partial<dataT>) {
      return new _DTO({ ...this.data, ...d })
    }
  }
}

const User = makeDTO(
  class {
    data = new res.User()
    api = {}
    adapter = {}
    isEq(d: res.User) {
      return this.data.id === d.id
    }
  }
)

const user = new User()
const user2 = user.copy({ id: 2, name: 'aa' }) /*?*/

// class Student2 extends DTO<res.Student> {
//   data = new res.Student()
//   controller = {}
//   adapter = {}
//
//   copy() {
//     return this
//   }
// }
// const student2 = new Student2()
// student2.copy() /*?*/
//
// const Student = makeDTO({
//   data: new res.Student(),
//   api: {},
//   adapter: {},
// })
//
// const student = new Student({})
// const student1 = student.copy()
//
// // student.isEq(student1.data) /*?*/
//
// type d = res.Student
// type s = res.Teacher
