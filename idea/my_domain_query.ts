import * as res from 'res'

// Response
// 클래스 선언시 함수 못쓰게 할 수 없나...
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

abstract class DTO<dataT = any, controllerT = any, adapterT = any> {
  abstract data: dataT
  abstract controller: controllerT
  abstract adapter: adapterT

  copy(overwrite?: dataT): this {
    // @ts-ignore
    return new this(Object.assign({}, this.data, overwrite))
  }

  constructor() {}
}

function makeDTO<dataT, apiT, adapT>({
  data,
  api,
  adapter,
}: {
  data: dataT
  api: apiT
  adapter: adapT
}) {
  return class DTO {
    data = data
    api = api
    adapter = adapter

    constructor(d?: Partial<DTO['data']>) {
      if (d) Object.assign(this.data, d)
    }

    copy(d: Partial<DTO['data']>) {
      return new DTO({ ...this.data, ...d })
    }
  }
}

const Student = makeDTO({
  data: new res.Student(),
  api: {},
  adapter: {},
})

type d = res.Student
type s = res.Teacher

const student1 = new Student()
const student2 = student1.copy({})
