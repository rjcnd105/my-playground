import * as res from 'src/res'

declare module 'src/res' {
  class Teacher extends VO<Teacher> {
    name = ''
    age?: number
    type: 'A' | 'B'
    Student: res.Student[]
  }
}
