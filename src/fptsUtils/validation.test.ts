import { isLeft, left, right } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { validator } from './validation'

const validNameLength = validator(
  (name: string) => name.length > 0 && name.length < 10,
  {
    identifier: '#name',
    message: '이름은 1~9 글자로 지어야 합니다.',
  }
)
const validNameAA = validator((name: string) => name.includes('aa'), {
  identifier: '#name',
  message: 'aa가 2개 이상 들어가 있어야 합니다.',
})

validNameLength(right('aaaa')) /*?*/
validNameLength(right('asdfsdfsdfds')) /*?*/

const my_validation = pipe(right(''), validNameLength, validNameAA) /*?*/

test('"aaaa" 길이 밸리데이션 통과', () => {
  expect(validNameLength(right('aaaa'))).toStrictEqual(right('aaaa'))
})
test('"열글자에요열글자에요" 길이 밸리데이션 실패', () => {
  expect(isLeft(validNameLength(right('열글자에요열글자에요')))).toBe(true)
})
test('빈 문자열 밸리데이션 2개 실패', () => {
  expect(my_validation).toStrictEqual(
    left({
      value: '',
      errors: [
        {
          identifier: '#name',
          message: '이름은 1~9 글자로 지어야 합니다.',
        },
        {
          identifier: '#name',
          message: 'aa가 2개 이상 들어가 있어야 합니다.',
        },
      ],
    })
  )
})
