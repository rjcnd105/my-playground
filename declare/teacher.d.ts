import * as res from 'res'

declare module 'res' {
  class Teacher extends VO<Teacher> {
    name = ''
    age?: number
    type: 'A' | 'B'
    Student: res.Student[]
  }
}
