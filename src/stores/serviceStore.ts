import { ClassT } from '../types/utils'

// 서비스에 데이터 저장
class ServiceStore {
  #store = new WeakMap<ClassT, InstanceType<ClassT>>()

  reg<T extends ClassT>(
    Service: T,
    ...params: ConstructorParameters<T>
  ): InstanceType<T> {
    if (this.has(Service)) return this.get<T>(Service)!
    return this.set(Service, ...params)
  }

  set<T extends ClassT>(
    Service: T,
    ...params: ConstructorParameters<T>
  ): InstanceType<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.#store.set(Service, new Service(...params))
    return this.get(Service)!
  }

  get<T extends ClassT>(Service: T): InstanceType<T> | undefined {
    return this.#store.get(Service)
  }

  has<T extends ClassT>(Service: T) {
    return this.#store.has(Service)
  }

  del<T extends ClassT>(Service: T) {
    return this.#store.delete(Service)
  }
}

const serviceStore = new ServiceStore()
export default serviceStore
