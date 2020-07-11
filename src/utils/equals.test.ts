import { getStructEq, eqString, Eq, eqNumber, eqStrict, fromEquals } from 'fp-ts/es6/Eq'

const student = {
  a: 10,
  b: 30,
  score: [
    { korea: 44, eng: 72 },
    { korea: 66, eng: 22 },
  ],
}

// type Student = typeof student
//
// const myFromEqual = fromEquals((x: string, y: number) => parseInt(x, 10) === y)
//
// const equalStudent: Eq<Student> = getStructEq({
//   a: eqNumber,
//   b: eqNumber,
//   score: eqStrict,
// })
//
// it('should Equal', function() {
//   eqString.equals('a', 'a')
//   getStructEq()
//   eqx
// })
