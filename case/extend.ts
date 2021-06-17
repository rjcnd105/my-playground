// ts 4.2에 추가됨
// abstract를 사용하면 abstract constructor, constructor 둘 다 받을 수 있음.(포함의 개념)

// type MergeCtor<A, B> = new (
//   props: GetProps<A> & GetProps<B>
// ) => GetInstance<A> & GetInstance<B>
//
// const InsList = <ctorT extends Constructor>(ctor: ctorT) => <T extends GetProps<ctorT>[]>() => class {
//   static #ctor = ctor
//   static fromArray(arr: T, ctor: ctorT){
//     return arr.map(args => new ctor(args))
//   }
// }

import { AbstractConstructor } from '../idea/basic'
import { Constructor } from '../src/types/utils'

function applyMixins<C extends AbstractConstructor[]>(...constructors: [...C]) {
  console.log('applyMixins', constructors)

  class NewClass {}
  constructors.forEach((NewClass) => {
    console.log(NewClass)
    Object.getOwnPropertyNames(NewClass.prototype).forEach((name) => {
      console.log(name)
      Object.defineProperty(
        NewClass.prototype,
        name,
        Object.getOwnPropertyDescriptor(NewClass.prototype, name) ||
          Object.create(null)
      )
    })
  })

  return NewClass
}

// We'll create an abstract class "Animal" where
// the subclasses must override 'walk'
// abstract class Animal {
//   abstract 걸음(): void
//
//   숨쉼() {
//     console.log('breath')
//   }
// }
//
// class Dog extends Animal {
//   걸음() {}
//   짖음() {
//     console.log('왈왈!')
//   }
// }
//
// function base<T extends Constructor, A extends Constructor, I>(
//   Base: T,
//   other: A
// ) {
//   class _Base extends other {}
//   return _Base
// }
//
// applyMixins(An imal, Dog) /*?*/
//
// // A mixin which adds a new function (in this case, animate)
// function animatableAnimal<
//   // abstract constructorㄱㅏ 더 큰 개념이라 그냥 constructor도 받을 수 있다.
//   T extends Constructor
// >(Ctor: T) {
//   console.log(typeof Ctor)
//   console.log(Ctor)
//   abstract class StopWalking extends Ctor {
//     animate() {}
//   }
//
//   return StopWalking
// }
//
// // A subclass of the Animal, through the mixins, must still
// // handle the abstract contract for Animal. Which means it
// // needs to implement 'walk' below. Try deleting the function
// // to see what happens.
//
// const dog = new Dog()
// dog.숨쉼()
// dog.걸음()
// dog.짖음()

// Each mixin is a traditional ES class
class Jumpable {
  jump() {
    console.log('jump')
  }
}

class Duckable {
  duck() {
    console.log('duck')
    return 'duck'
  }
}

// Including the base
class Sprite {
  x = 0
  y = 0
}

class A {
  a: number
  constructor(n: number) {
    this.a = 10
  }
}
class B {
  b: number
  constructor(b: number) {
    this.b = 20
  }
}

const C = applyMixins(A, B)

const c = new C()
console.log('', c)

const obj = {
  a: 10,
} as const

console.log(typeof obj)

type Obj = typeof obj

// Then you create an interface which merges
// the expected mixins with the same name as your base
interface Sprite extends Jumpable, Duckable {}

applyMixins(Sprite, Jumpable, Duckable)

// const b: Sprite = {}

const a: Sprite = new Sprite()
a.duck() /*?*/

export default {}

const classFunctor =
  <T, ctorT extends Constructor<T> | AbstractConstructor<T>>(
    constructor: ctorT
  ) =>
  (fn: (ctor: ctorT) => T) =>
    fn(constructor)
