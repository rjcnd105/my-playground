// matchArr 배열 값대로 정렬시킴, matchArr에 없던 값은 맨 뒤로 이동
// ex) sortMatchArr(['q', 'a', 'o'])(['o', null, 'q')
// -> ['q', 'o', null]
export const sortMatchArr = <T>(matchArr: T[]) => (arr: any[]) => {
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
