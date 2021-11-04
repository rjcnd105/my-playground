import { ImplTrait } from '../ImplTrait'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { makeAutoObservable } from 'mobx'
import { StudentColl } from '../StudentColl'
import { BASE_URL } from '../constants'

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

  // util..? 어떤 식으로 할지..?
  export const utils = {
    update({ data }: DataK, updateData: Partial<Data>) {
      Object.assign(student.data, updateData)
    },
    delete(id: Data['id'], targetColl: StudentColl.Impl) {
      targetColl.app.delete(id)
    },
  }

  export namespace req {
    export type Save = { name?: string; age?: number; phone?: string }
    export type Delete = { id: Data['id'] }
    export type Fetch = { id: Data['id'] }
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
