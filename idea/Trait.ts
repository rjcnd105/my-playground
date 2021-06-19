export class Trait<T extends Record<string, any>> {
  #keyToSym = new Map<keyof T, symbol>()
  #symToTrait = new Map<symbol, any>()

  constructor(traitData: T) {
    for (const traitDataKey in traitData) {
      const sym = Symbol(traitDataKey)
      this.#keyToSym.set(traitDataKey, sym)
      this.#symToTrait.set(sym, traitData[traitDataKey])
    }
  }

  get syms() {
    return Object.fromEntries(this.#keyToSym) as { [key in keyof T]: symbol }
  }

  private get traits() {
    return Object.fromEntries(
      [...this.#keyToSym.entries()].map(([key, sym]) => [
        key,
        this.#symToTrait.get(sym),
      ])
    ) as { [key in keyof T]: T[key] }
  }

  static merge<T extends Trait<any>[]>(...traits: [...T]) {
    return new Trait({
      ...traits.reduce((obj, trait) => {
        return Object.assign(obj, { ...Object.entries(trait.traits) })
      }, {}),
    })
  }

  sym(name: keyof T): symbol {
    const _sym = this.#keyToSym.get(name)
    if (!_sym) throw Error('symbol not found.')

    return _sym
  }

  isImpl(t: any) {
    const obj = t.prototype?.constructor ? t.prototype : t

    return [...this.#keyToSym.values()].every((sym) => obj[sym])
  }
}

const t = new Trait({
  name: 'ss',
}) /*?*/

t.sym('name') /*?*/
t.syms /*?*/

class A {}

t.isImpl(A) /*?*/

const s = Symbol()

class B {
  // [t.sym('name')]: 'dd'; // ERROR!
  [s]: 'aaa'
} /*?*/
