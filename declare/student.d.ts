import res from 'res'

declare module 'res' {
  class Student extends VO<Student> {
    name = ''
    age?: number
    grade: 1 | 2 | 3 | 4 | 5 | 6
  }
}
