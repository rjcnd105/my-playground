export class Seq<T> {
  #iter: IterableIterator<T>
  constructor(iterable: IterableIterator<T>) {
    this.#iter = iterable
  }

  toArr() {
    return [...this.#iter]
  }
}
