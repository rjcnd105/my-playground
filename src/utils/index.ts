import { UnionToIntersection } from '../types/utils'

// matchArr 배열 값대로 정렬시킴, matchArr에 없던 값은 맨 뒤로 이동
// ex) sortMatchArr(['q', 'a', 'o'])(['o', null, 'q')
// -> ['q', 'o', null]
export const sortMatchArr = <T>(matchArr: T[]) => (arr: any[]) => {
  return arr.sort((a, b) => {
    const aIndex = matchArr.findIndex((v) => v === a)

    if (aIndex === -1) {
      return 1
    }

    const bIndex = matchArr.findIndex((v) => v === b)

    if (bIndex === -1) {
      return -1
    }

    return aIndex - bIndex
  })
}
/* ex) const arr = [['a1', 'b1'], ['a2', 'b2']]
 * arr.map(tupleReverse) // [['b1', 'a1'], ['b2', 'a2']]
 * */
export const tupleReverse = <T1, T2>([v1, v2]: readonly [T1, T2]) =>
  [v2, v1] as const

/* 값 min max 제한
 * ex) const confineValue = confineMinMax(1, 10)
 * confineValue(-2) // :1
 * confineValue(15) // 10
 * confineValue(7) // 7
 * */
export const confineMinMax = (min: number, max: number) => {
  return (value: number) => {
    if (value <= min) return min
    if (value >= max) return max
    return value
  }
}

/* subObj가 superObj의 부분집합인지
 * ex) isSubset({name: '김회준', age: 17, phone: '010-5300-3599'}, {name: '김회준', age: 17}) // true
 * isSubset({name: '김회준', age: 29}, {name: '김회준', age: 29}) // true
 * isSubset({ name: '김회준', age: 29 }, { name: '김회준', age: 30 }) false
 * */
export const isSubset = <T>(superObj: T, subObj: Partial<T>) => {
  for (const subObjKey in subObj) {
    const isSameField = subObj[subObjKey] === superObj[subObjKey]
    if (!isSameField) return false
  }

  return true
}

/* 컬렉션을 순회하며 omits의 값 중 부분집합을 만족하는 것들을 뺌
 * ex) const coll = [{a:10, b:5}, {a:32, b:7}, {a:10, b:9}, {a:16, b:42}, {a:3, b:7}]
 * const omits = [{b:7}, {a:12, b:42}, {a:10, b:9}]
 * omitCollection(coll, omits) //=> [{a:10, b:5}, {a:16, b:42}]
 * */
export const omitCollection = <S>(
  collection: S[],
  omits: Partial<S>[]
): S[] => {
  const _omits = [...omits]

  return collection.filter((collectionItem) => {
    for (let i = 0; i < _omits.length; i++) {
      if (isSubset(collectionItem, _omits[i])) {
        // _omits.splice(i, 1)
        return false
      }
    }
    return true
  })
}

// ts4.0에서 지원하는 더 강력한 타입 체킹으로 변경
// Object.assign 대신 쓰시면 됩닌다.
export const typeSafeAssign = <T extends any[]>(...args: [...T]) =>
  args.reduce<UnionToIntersection<T[number]>>(
    (result, current) =>
      (Object.keys(current) as Array<keyof typeof current>).reduce(
        (target, key) => {
          target[key] = current[key]
          return target
        },
        result
      ),
    args[0]
  )

// lodash _.pick이 타입 체킹이 너무 약해서 빡쳐서 만들습니다.
// _.pick 대신에 쓰시면 됩니다.
export const exactPick = <
  T extends Record<K[number], unknown>,
  K extends Readonly<Array<keyof T>>
>(
  obj: T,
  props: K
) => {
  const result = {} as Partial<T>

  for (const prop of props) {
    if (obj[prop]) result[prop] = obj[prop]
  }

  return result as Pick<T, K[number]>
}
