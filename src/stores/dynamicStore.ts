import { ClassT } from '../types/utils'

type Separator<T> = [Class: T, name: string]

// 동적 구분자(Separator)에 따른 데이터 저장
class DynamicStore {
  #rootStore = new WeakMap<ClassT, Map<string, InstanceType<ClassT>>>()

  reg<T extends ClassT>(
    separator: Separator<T>,
    ...params: ConstructorParameters<T>
  ): InstanceType<T> {
    return this.has(separator) ? this.get(separator)! : this.set(separator, ...params)
  }

  set<T extends ClassT>(
    [Service, name]: Separator<T>,
    ...params: ConstructorParameters<T>
  ): InstanceType<T> {
    const separator: Separator<T> = [Service, name]
    if (!this.#rootStore.has(Service)) this.#rootStore.set(Service, new Map())
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.#rootStore.get(Service)!.set(name, new Service(...params))
    return this.get(separator)!
  }

  get<T extends ClassT>([Service, name]: Separator<T>): InstanceType<T> | undefined {
    return this.#rootStore.get(Service)?.get(name)
  }

  has<T extends ClassT>([Service, name]: Separator<T>) {
    return !!this.#rootStore.get(Service)?.has(name)
  }

  del<T extends ClassT>([Service, name]: Separator<T>) {
    return !!this.#rootStore.get(Service)?.delete(name)
  }

  deleteRoot<T extends ClassT>(Service: T) {
    return this.#rootStore.delete(Service)
  }
}

const dynamicStore = new DynamicStore()
export default dynamicStore
