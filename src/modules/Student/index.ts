import { ImplTrait } from '../ImplTrait'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { makeAutoObservable } from 'mobx'
import { StudentColl } from '../StudentColl'

export module Student {
  export class Impl implements ImplTrait<Data> {
    app: Data
    get data(): Data {
      return { ...this.app }
    }

    // 디폴트 데이터를 여기서..?
    constructor({ id = nanoid(), age = 0, name = '', phone }: Data) {
      this.app = {
        id,
        age,
        name,
        phone,
      }
      makeAutoObservable(this)
    }
  }

  export const controller = {
    fetch({ id }: Pick<Data, 'id'>) {
      return axios.get<Data>(`${BASE_URL}/~`)
    },
    save<T extends res.Save>(id: Data['id'], data: T) {
      axios.post(`${BASE_URL}/~`, data).then(() => {})
    },
    delete(id: Data['id']) {
      axios.delete(`${BASE_URL}/${id}`)
    },
  }

  const BASE_URL = 'https://aaaa.com' as const

  namespace res {
    export type Save = { name?: string; age?: number; phone?: string }
  }

  // util 어떤 식으로 할지..?
  export const utils = {
    update({ data }: DataK, updateData: Partial<Data>) {
      Object.assign(student.data, updateData)
    },
    delete(id: Data['id'], targetColl: StudentColl.Impl) {},
  }

  export type DataK = {
    data: Data
  }

  export type Data = {
    id: string
    name: string
    age: number
    phone?: string
  }
}

const student = new Student.Impl({
  id: 'I1423',
  name: '',
  age: 30,
  phone: '01053003599',
})
