import React from 'react'
import { action, intercept, observable } from 'mobx'

// 컴포넌트 스토어끼리의 데이터 전달을 위함
class AppStore {
  @observable stores = new Map()
  constructor() {
    intercept(this.stores, change => {
      return change
    })
  }

  reg<T>(name: string): T | undefined
  reg<T>(name: string, makeStore?: () => T): T
  @action reg<T>(name: string, makeStore?: () => T) {
    if (this.has(name) || !makeStore) {
      return this.get<T>(name)
    }
    return this.set<T>(name, makeStore())
  }

  get<T>(name: string): T {
    return this.stores.get(name)
  }
  has(name: string) {
    return this.stores.has(name)
  }
  @action set<T>(name: string, store: T): T {
    this.stores.set(name, store)
    return store
  }
  @action del(name: string) {
    return this.stores.delete(name)
  }
}

const appStore = new AppStore()

export default appStore
