import Dataclass from 'dataclass'
import { Constructor } from '../src/types/utils'
import { Mixin } from 'ts-mixer'

// export class Trait<T extends Record<string, any>> {
//   #keyToSym = new Map<keyof T, symbol>()
//   #symToTrait = new Map<symbol, any>()
//
//   constructor(traitData: T) {
//     for (const traitDataKey in traitData) {
//       const sym = Symbol(traitDataKey)
//       this.#keyToSym.set(traitDataKey, sym)
//       this.#symToTrait.set(sym, traitData[traitDataKey])
//     }
//   }
//
//   get syms() {
//     return Object.fromEntries(this.#keyToSym) as { [key in keyof T]: symbol }
//   }
//
//   private get traits() {
//     return Object.fromEntries(
//       [...this.#keyToSym.entries()].map(([key, sym]) => [
//         key,
//         this.#symToTrait.get(sym),
//       ])
//     ) as { [key in keyof T]: T[key] }
//   }
//
//   static merge<T extends Trait<any>[]>(...traits: [...T]) {
//     return new Trait({
//       ...traits.reduce((obj, trait) => {
//         return Object.assign(obj, { ...Object.entries(trait.traits) })
//       }, {}),
//     })
//   }
//
//   sym(name: keyof T): symbol {
//     const _sym = this.#keyToSym.get(name)
//     if (!_sym) throw Error('symbol not found.')
//
//     return _sym
//   }
//
//   isImpl(t: any) {
//     const obj = t.prototype?.constructor ? t.prototype : t
//
//     return [...this.#keyToSym.values()].every((sym) => obj[sym])
//   }
// }
//
// const t = new Trait({
//   name: 'ss',
// }) /*?*/
//
// t.sym('name') /*?*/
// t.syms /*?*/
//
// class A {}
//
// t.isImpl(A) /*?*/
//
// const s = Symbol()
//
// class B {
//   // [t.sym('name')]: 'dd'; // ERROR!
//   [s]: 'aaa'
// } /*?*/

// Struct, Trait

const TraitSym = Symbol('Trait')
const StructSym = Symbol('Struct')
const ImplSym = Symbol('Impl')

type OmitDataclassProperties<T> = Omit<T, '_URI'>

class Struct<T> extends Dataclass<OmitDataclassProperties<T>> {
  [StructSym] = true

  static isStruct(d: any) {
    return !!d[StructSym]
  }
  constructor(...args: OmitDataclassProperties<T>[]) {
    super(...args)
  }
}

class Trait<T> extends Dataclass<OmitDataclassProperties<T>> {
  [TraitSym] = true

  static isTrait(d: any) {
    return !!d[TraitSym]
  }
  constructor(...args: OmitDataclassProperties<T>[]) {
    super(...args)
  }
}

const Impl = (() => {
  const extendImpl = <ctorT extends Constructor>(ctor: ctorT) =>
    class extends ctor {
      [ImplSym] = true
    }

  return {
    fromTrait<traitT extends Constructor<Trait<any>>>(Trait: traitT) {
      return {
        for<structT extends Constructor<Struct<any>>>(Struct: structT) {
          return extendImpl(Mixin(Struct, Trait))
        },
      }
    },
    fromStruct<structT extends Constructor<Struct<any>>>(Struct: structT) {
      return extendImpl(Struct)
    },
    isImpl(any: any) {
      return !!any[ImplSym]
    },
  }
})()

// const Impl = (trait:) => {
// };

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      )
    })
  })
}

// Trait
function makeTrait<T1>(_Trait: Constructor<Trait<T1>>) {
  // console.log('makeTrait', _Trait)
  return {
    impl<T2>(_Struct: Constructor<Struct<T2>>) {
      class _Impl extends Dataclass<
        Partial<OmitDataclassProperties<T1>> & OmitDataclassProperties<T2>
      > {
        readonly _URI = 'Implement'

        constructor(
          properties: Partial<OmitDataclassProperties<T1>> &
            OmitDataclassProperties<T2>
        ) {
          super(properties)
        }
      }

      applyMixins(_Impl, [
        _Trait,
        _Struct,
        class {
          readonly _URI = 'Implement'
        },
      ])
      return _Impl
    },
  }
}

const UserTrait = makeTrait(
  class UserTrait extends Trait<UserTrait> {
    accessDateStr?: `${number}-${number}-${number}`

    getAccessDate() {
      return this.accessDateStr ? new Date(this.accessDateStr) : undefined
    }
  }
)

interface User {
  name: string
}

class ParentDTO extends Struct<ParentDTO> {}

interface ParentDTO extends User, Struct<ParentDTO> {
  phoneNumber: string
}

class User2 extends Dataclass<User2> {
  name?: string
  age = 0
}

class User3 extends User2 {
  address = 'address'
}

class Struct2 extends Struct<Struct2> {
  name = 'noname'
}

const ImplStruct2 = Impl.fromStruct(Struct2)
class ASD extends Impl.fromStruct(Struct2) {}

class D extends Impl.fromStruct(Struct2) {
  money = 3000
}
interface D extends Struct2 {}

Struct.isStruct(new Struct2()) /*?*/

const aaaa = new D() /*?*/
aaaa.name /*?*/
aaaa.money /*?*/

aaaa /*?*/

Trait.isTrait(aaaa) /*?*/
Struct.isStruct(aaaa) /*?*/

class MyTrait extends Trait<MyTrait> {
  #dimension = 3
  #area = 10
  getDimension() {
    return this.#dimension
  }
  getArea() {
    return this.#area
  }
}
class MyStruct extends Struct<MyStruct> {
  x = 10
  y = 10
}
interface MyImpl extends MyTrait, MyStruct {}
class MyImpl extends Impl.fromTrait(MyTrait).for(MyStruct) {
  getDimensionArea() {
    return this.x * this.y * this.getArea() * this.getDimension()
  }
}
const myImpl = new MyImpl({ x: 3, y: 4 })
const myImpl2 = new MyImpl({ x: 7, y: 12 })

myImpl.getDimensionArea() /*?*/ // 360
myImpl2.getDimensionArea() /*?*/ // 2520

const st2 = new Struct2()
console.log('', st2.name) /*?*/

class StudentD extends Struct<StudentD> {
  name?: string
}

const user2 = new User2({ name: 'ddd' })
console.log(user2.name, user2.age)
const user3 = new User3({ name: 'ddd' })
console.log(user3.name, user3.age, user3.address)

class A {
  a = 10
}

class B {
  b = 30
}

class C extends Mixin(A, B) {
  c = 100
}
