/***
 * matchArr 배열 값대로 정렬시킴, matchArr에 없던 값은 맨 뒤로 이동
 * @example
 * const matchArr = sortMatchArr(['q', 'a', 'o'])
 * matchArr(['o', null, 'q') :> ['q', 'o', null]
 ***/
const sortMatchArr = <T>(matchArr: T[]) => (arr: any[]) => {
  return arr.sort((a, b) => {
    const aIndex = matchArr.findIndex(v => v === a)

    if (aIndex === -1) {
      return 1
    }

    const bIndex = matchArr.findIndex(v => v === b)

    if (bIndex === -1) {
      return -1
    }

    return aIndex - bIndex
  })
}

/***
 * @example
 * const reverseTuple = tupleReverse([3,4]) :> [4,3]
 ***/
export const tupleReverse = <T1, T2>([v1, v2]: readonly [T1, T2]) => [v2, v1] as const

/***
 * @example
 * isSubSet({a: 10, b: 20}, {a: 15}) :> true
 * isSubSet({a: 10, b: 20}, {a: 15, c: 22}) :> false
 ***/
export const isSubset = <T1 extends { [key: string]: any }, T2 extends T1>(superObj: T1, subObj: T2) => {
  for (const subObjKey in subObj) {
    if (subObj.hasOwnProperty(subObjKey)) {
      const isSameField = subObj[subObjKey] === superObj[subObjKey]
      if (!isSameField) return false
    }
  }
  return true
}

export default {
  sortMatchArr,
  tupleReverse,
}
