declare module 'res' {
  import { VO } from './VO'

  class Student extends VO<Student> {
    name = ''
    age?: number
    grade: 1 | 2 | 3 | 4 | 5 | 6
  }
}
