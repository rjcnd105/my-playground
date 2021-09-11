import { ImplTrait } from '../ImplTrait'
import axios from 'axios'
import { nanoid } from 'nanoid'

export module Student {
  export class Impl implements ImplTrait<Data> {
    data: Data

    constructor(data = new Data()) {
      this.data = data
    }
  }

  export const utils = {
    update() {},
  }

  export const api = {
    fetch(id: Data['id']) {
      return { id: 'I99', name: 'hj', age: 19, phone: '0001112222' }
    },
    update({ data }: K) {
      //... axios(K)
    },
    delete({ data }: K) {},
  }

  export const controller = {
    get() {},
  }

  type K = {
    data: Data
  }

  class Data {
    id = nanoid()
    name = ''
    age = 0
    phone = ''
  }
}

const student = new Student.Impl({
  id: 'I1423',
  name: '',
  age: 30,
  phone: '01053003599',
})
