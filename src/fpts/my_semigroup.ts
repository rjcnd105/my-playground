import * as EQ from 'fp-ts/Eq'
import * as Opt from 'fp-ts/Option'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import * as Semigroup from 'fp-ts/Semigroup'

interface Point {
  readonly x: number
  readonly y: number
}

/*** struct ***/
// 구조체 형태의 각각에 속성에 semigroup을 정의
const pointSemi = Semigroup.struct<Point>({
  x: N.SemigroupSum,
  y: N.SemigroupSum,
})

pointSemi.concat({ x: 3, y: 1 }, { x: 2, y: 2 }) /*?*/ // { x:5, y:3 }

// struct를 쓰지 않고 정의했을때.
const pointSemi2: Semigroup.Semigroup<Point> = {
  concat(p1, p2) {
    return {
      x: N.SemigroupSum.concat(p1.x, p2.x),
      y: N.SemigroupSum.concat(p1.y, p2.y),
    }
  },
}
pointSemi2.concat({ x: 3, y: 1 }, { x: 2, y: 2 }) /*?*/ // { x:5, y:3 }

/*** tuple ***/
const tupleSemi = Semigroup.tuple(S.Semigroup, N.SemigroupSum)
tupleSemi.concat(['a', 3], ['b', 10]) /*?*/ // [('ab', 13)]

/*** constant ***/
// concat에 어떤 값을 넣던 처음 고정시킨 값이 나옴
const constant10Semi = Semigroup.constant(10) /*?*/
constant10Semi.concat(14, 8) /*?*/ // 10

/*** max, min ***/
const numMaxSemi = Semigroup.max(N.Ord)
const numMinSemi = Semigroup.min(N.Ord)
numMaxSemi.concat(5, 12) /*?*/ // 12
numMinSemi.concat(5, 12) /*?*/ // 5

/*** first, last ***/
const firstSemi = Semigroup.first<number>()
const lastSemi = Semigroup.last<number>()
firstSemi.concat(5, 10) /*?*/ // 5
lastSemi.concat(5, 10) /*?*/ // 10

/*** reverse ***/
// 두 항의 순서를 바꿈
Semigroup.reverse(firstSemi).concat(5, 10) /*?*/ // 10
