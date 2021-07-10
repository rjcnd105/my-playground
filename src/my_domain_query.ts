import { VO } from './res/VO'
import { Constructor } from './types/utils'
import { Observable } from 'rxjs'
import {
  action,
  comparer,
  makeAutoObservable,
  isObservable,
  makeObservable,
  observable,
  reaction,
  isAction,
} from 'mobx'

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

// VO Intersection
// properties들만 있는 형태의 class이므로 순수한 자료 형태에 사용 가능
const abc: A & B & C = { name: 'abc' }

const obj = { name: 'aa', zzz: 10 }
// const d: A = { name: 'aa', zzz: 10 } // 이건 안되고
const d: A = obj // 이건 되네 제길,

/*** abstract class로 도메인 구현은 실패.. ***/
// abstract class Domain<dataT> {
//   abstract data: dataT
//   abstract api: any
//   abstract adapter: any
//
//   constructor(d?: Partial<dataT>) {
//     if (d) {
//       // @ts-ignore
//       console.log('constructor', this.data, d) /*?*/
//       // this.data가 abstract라 타입 에러.. 어케 해결하지?
//       // @ts-ignore
//       Object.assign(this.data, d)
//     }
//   }
//
//   // new this가 안되고...
//   copy(overwrite?: Partial<dataT>): this {
//     return new (this.constructor as new (d?: Partial<dataT>) => this)({
//       ...this.data,
//       ...overwrite,
//     })
//   }
// }
// DTO /*?*/

namespace res {
  export class User extends VO<User> {
    id = 1
    name = 'dd'
    age?: number
  }
}

interface DomainParams<dataT, apiT, adapT, actionT, compT> {
  data: dataT
  action: actionT
  comp: compT
  api: apiT
  adapter: adapT
  isEq?: (d1: dataT) => boolean
}

// 함수 인자로 클래스를 받음, 받을때 타입 추론과정을 거침(+ 추후 작성할 것을 정의함으로써 abstract class와 비슷한 효과를 누림)
function makeDomain<dataT, apiT, adapT, actionT, compT>(
  ctor: Constructor<DomainParams<dataT, adapT, apiT, actionT, compT>>
) {
  return class Domain extends ctor {
    constructor(d?: Partial<dataT>) {
      super(d)
      if (d) Object.assign(this.data, d)
    }

    copy(d?: Partial<dataT>) {
      return new Domain({ ...this.data, ...d })
    }
    update(d?: Partial<dataT>) {
      if (d) Object.assign(this.data, d)
    }
  }
}

// 성공적
const User = makeDomain(
  class {
    readonly data = makeObservable(new res.User(), { name: observable })
    api = {}
    adapter = {}
    comp = {}
    action = {
      setName: action((n: res.User['name']) => {
        this.data.name = n
      }),
    }
    isEq(d: res.User) {
      return this.data.id === d.id
    }
  }
)

const UserEq = {}

const user = new User() /*?*/

const user2 = user.copy({ id: 2, name: 'aa' }) /*?*/

user.action.setName('dd')
user.update({ name: 'dd2' })
// user.data /*?*/
// user.data = { id: 23, name: 'dsds' }
// user.data.name = 'dsds'
console.log(isObservable(user))
console.log(isAction(user.action.setName))
console.log(isObservable(user.data))
// user.setData({ id: 33, name: 'ff' })
// Response
// 외부 모듈 VO
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
// const Student = makeDomain({
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
