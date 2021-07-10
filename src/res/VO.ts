import { makeAutoObservable } from 'mobx'

export class VO<T extends Record<string, any>> {
  constructor(d?: Partial<T>) {
    if (d) Object.assign(this, d)
  }
}
