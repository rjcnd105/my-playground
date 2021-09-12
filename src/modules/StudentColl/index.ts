import { ImplTrait } from '../ImplTrait'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { makeAutoObservable } from 'mobx'
import { Student } from '../Student'

export module StudentColl {
  export class Impl implements ImplTrait<Data> {
    app: AppData
    get data() {
      return [...this.app.values()]
    }

    constructor(data: Data) {
      this.app = new Map()

      for (const datum of data) {
        this.app.set(datum.id, datum)
      }

      makeAutoObservable(this)
    }
  }

  export type AppData = Map<Student.Data['id'], Student.Data>
  export type Data = Student.Data[]
  export type DataK = { data: Data }
}

const student = new Student.Impl({
  id: 'I1423',
  name: '',
  age: 30,
  phone: '01053003599',
})
