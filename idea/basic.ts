import { fromNullable, isSome, none, Option, some } from 'fp-ts/Option'
import Dataclass from 'dataclass'

export const Struct = class Struct extends Dataclass<Struct> {
  readonly _URI = 'Struct'
  constructor(...args: any[]) {
    super(...args)
  }
}

class DD extends Struct {
  id = 0
  a?: number
  b?: number
}

const dd = new DD({ a: 20, b: 30 })
dd.toJSON() /*?*/

class DDD extends Struct {
  readonly tag = 'DDD'
  #a = 152
  c = 'hi'
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
