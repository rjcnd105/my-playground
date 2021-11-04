import axios from 'axios'
import { BASE_URL } from '../constants'
import { Student } from './index'

export const controller = {
  fetch({ id }: Student.req.Fetch) {
    return axios.get<Student.Data>(`${BASE_URL}/~`)
  },
  save<T extends Student.req.Save>(id: Student.Data['id'], data: T) {
    axios.post(`${BASE_URL}/~`, data).then(() => {})
  },
  delete({ id }: Student.req.Delete) {
    axios.delete(`${BASE_URL}/${id}`)
  },
}
