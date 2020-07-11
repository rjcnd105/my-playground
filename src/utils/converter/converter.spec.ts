import converter from './converter'

it('튜플 to 오브젝트', () => {
  const fromData = ['a', 'hihi'] as const
  const toData = { a: 'hihi' }
  const testData = converter.tuple2obj(fromData)
  expect(toData).toEqual(testData)
})
