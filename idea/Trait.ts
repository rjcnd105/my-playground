import Dataclass from 'dataclass'
import { Constructor } from '../src/types/utils'

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

type OmitDataclassProperties<T> = Omit<T, '_URI'>

class Struct<T> extends Dataclass<OmitDataclassProperties<T>> {
  readonly _URI = TraitSym

  static isStruct(d: any) {
    return d._URI === Struct.prototype._URI
  }
  constructor(...args: OmitDataclassProperties<T>[]) {
    super(...args)
  }
}

class Trait<T> extends Dataclass<OmitDataclassProperties<T>> {
  readonly _URI = StructSym

  static isTrait(d: any) {
    return d._URI === Trait.prototype._URI
  }
  constructor(...args: OmitDataclassProperties<T>[]) {
    super(...args)
  }
}

type UriImpl = { readonly _URI: 'Impl' }
interface Impl {
  fromTrait<traitT>(trait: Trait<traitT>): {
    for<structT>(
      struct: Struct<structT>
    ): Trait<traitT> & Struct<structT> & UriImpl
  }
  fromStruct<structT>(struct: Struct<structT>): Struct<structT> & UriImpl
}

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

class StudentDTO extends Dataclass<StudentDTO> {
  school?: string
  age = 0
}

interface StudentDTO extends User, Struct<StudentDTO> {}

class ParentDTO extends Struct<ParentDTO> {}

interface ParentDTO extends User, Struct<ParentDTO> {
  phoneNumber: string
}

const std = new StudentDTO() /*?*/
console.log('', std.age)

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

const st2 = new Struct2()
console.log('', st2.name) /*?*/

class StudentD extends Struct<StudentD> {
  name?: string
}

const user2 = new User2({ name: 'ddd' })
console.log(user2.name, user2.age)
const user3 = new User3({ name: 'ddd' })
console.log(user3.name, user3.age, user3.address)
