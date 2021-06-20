import { fromNullable, isSome, none, Option, some } from 'fp-ts/Option'
import Dataclass from 'dataclass'

class Struct<T> extends Dataclass<T> {
  readonly _URI = 'Struct'
  constructor(param: Partial<T>) {
    super(param)
  }
}

class DD extends Struct<DD> {
  id = 0
  a?: number
  b?: number
}

const dd = new DD({ a: 20, b: 30 })
dd.toJSON() /*?*/
dd.a /*?*/
dd._URI /*?*/
const dd2 = dd.copy({ a: 30 }) /*?*/
dd2.a /*?*/

class DDD<T> extends Struct<T> {
  readonly tag = 'DDD'
  #a = 152
  c = 'hi'
}

const o1 = {
  type: 'o1',
}

interface Adsafsf {
  (n: number): string
}

function applyMixins<C extends AbstractConstructor[]>(...constructors: [...C]) {
  console.log('applyMixins', constructors)

  class Derived {}

  constructors.forEach((ctor) => {
    console.log(ctor.prototype)
    Object.getOwnPropertyNames(ctor.prototype).forEach((name) => {
      console.log(name)
      Object.defineProperty(
        Derived.prototype,
        name,
        Object.getOwnPropertyDescriptor(ctor.prototype, name) ||
          Object.create(null)
      )
    })
  })

  console.log('applyMixins', Derived.prototype)

  return Derived
}

class A {
  a = 10
  fly() {
    console.log('fly')
  }
  constructor() {}
}

class B {
  c = 30
}

const MyClass = applyMixins(A, B)

interface MyClass extends A, B {}
const myClass = new MyClass()
// myClass.fly /*?*/

export type AbstractConstructor<
  T = any,
  argT extends any[] = any[]
> = abstract new (...args: [...argT]) => T

const make = <T>(a: AbstractConstructor<T>) =>
  class extends a {
    a: 10
  }

// class Struct<T> {
//   readonly _URI = 'Struct'
//   readonly tag = 'Struct'
//   constructor(arg: T) {
//     Object.assign(this, arg)
//   }
// }

// const makeStruct = <T extends Constructor>(ctor: T) => {
//   Object.assign(this, Struct, ctor)
//   return obj as Struct<T> & T
// }

// const struct = new Struct() /*?*/
// const UserStruct = makeStruct(
//   class {
//     readonly tag = 'UserStruct'
//     id = 10
//     name?: string
//   }
// )
// const user = new UserStruct({ id: 10, name: 'hj' }) /*?*/
//
// user instanceof UserStruct /*?*/
// user instanceof Struct /*?*/

type insStruct = InstanceType<typeof Struct>

// export abstract class Struct {
//   static update
//   [key: ]
// }
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Trait {}

// class UserStruct extends Struct
// makeStruct(UserStruct)

// const makeOptionStruct = (structCtor: Constructor<Struct>) => {
//   return class extends structCtor {}
// }

// const fromStruct = (struct: Struct) => () =>

// const user = user /*?*/
// user.name /*?*/
// isSome(user.name) /*?*/

const r: Record<string, any> = {}

class T<typeT> extends Dataclass<typeT> {}
interface T<typeT extends { age: number }> {
  data: typeT
  name: string
}
T.prototype.name = ''

class TT<typeT> extends Dataclass<typeT> {}

interface TT<typeT> extends T<typeT> {
  address: string
}
TT.prototype.address = ''

const myT = new T({ age: 10 })
myT.name /*?*/
myT.data.age /*?*/

// const myTT = new TT({ age: 14 })
