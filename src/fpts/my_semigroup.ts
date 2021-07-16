/***
 * Semigroup (반군, subgroup)
 * semigroup은 이미 group(군)안에 속해 있기에
 * 재검증을 거치지 않아도 된다는 큰 장점이 있다.
 * (여기서의 군은, string, number, Array 등이 있다.)
 * 그래서 fp-ts에서도 각 군에서 semigroup에 대한 메소드가 속해있다.
 ***/

import * as EQ from 'fp-ts/Eq'
import * as Opt from 'fp-ts/Option'
import * as B from 'fp-ts/boolean'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import * as FN from 'fp-ts/function'
import * as Semi from 'fp-ts/Semigroup'
import { Monoid } from "fp-ts/Monoid";

interface Point {
  readonly x: number
  readonly y: number
}


/*** struct ***/
// 구조체 형태의 각각에 속성에 semigroup을 정의

const semiPointSum = Semi.struct<Point>({
  x: N.SemigroupSum,
  y: N.SemigroupSum,
})
semiPointSum.concat({ x: 3, y: 1 }, { x: 2, y: 2 }) /*?*/ // { x:5, y:3 }

const semiPointMin = Semi.struct<Point>({
  x: Semi.min(N.Ord),
  y: Semi.min(N.Ord),
})
semiPointMin.concat({ x: 4, y: 12 }, { x: 9, y: 6 }) /*?*/ // { x: 4, y:6 }

interface Vector {
  from: Point
  to: Point
}

// 이런식으로 확장 가능
const semiVectorSum = Semi.struct<Vector>({
  from: semiPointSum,
  to: semiPointSum,
})

semiVectorSum.concat(
  {
    from: { x: 1, y: 5 },
    to: { x: 3, y: 10 },
  },
  {
    from: { x: 3, y: 2 },
    to: { x: 12, y: 4 },
  }
) /*?*/ // Vector { from: { x: 4, y: 7 }, to: { x: 15, y: 14 } }

// struct를 쓰지 않고 정의했을때.
const pointSemi2: Semi.Semigroup<Point> = {
  concat(p1, p2) {
    return {
      x: N.SemigroupSum.concat(p1.x, p2.x),
      y: N.SemigroupSum.concat(p1.y, p2.y),
    }
  },
}
pointSemi2.concat({ x: 3, y: 1 }, { x: 2, y: 2 }) /*?*/ // { x:5, y:3 }

/*** tuple ***/
const tupleSemi = Semi.tuple(S.Semigroup, N.SemigroupSum)
tupleSemi.concat(['a', 3], ['b', 10]) /*?*/ // [('ab', 13)]

// 직접 구현
type Tuple2 = [boolean, boolean]

const semiAllArr: Semi.Semigroup<Tuple2> = {
  concat(t1, t2) {
    return [
      B.SemigroupAll.concat(t1[0], t2[0]),
      B.SemigroupAll.concat(t1[1], t2[1]),
    ]
  },
}

semiAllArr.concat([true, true], [false, true]) /*?*/ // [false, true]

/*** constant ***/
// concat에 어떤 값을 넣던 처음 고정시킨 값이 나옴
const constant10Semi = Semi.constant(10) /*?*/
constant10Semi.concat(14, 8) /*?*/ // 10

/*** max, min ***/
const numMaxSemi = Semi.max(N.Ord)
const numMinSemi = Semi.min(N.Ord)
numMaxSemi.concat(5, 12) /*?*/ // 12
numMinSemi.concat(5, 12) /*?*/ // 5

/*** first, last ***/
const firstSemi = Semi.first<number>()
const lastSemi = Semi.last<number>()
firstSemi.concat(5, 10) /*?*/ // 5
lastSemi.concat(5, 10) /*?*/ // 10

/*** reverse ***/
// 두 항의 순서를 바꿈
Semi.reverse(firstSemi).concat(5, 10) /*?*/ // 10

/*** boolean - SemigroupAll, SemigroupAny ***/
B.SemigroupAll.concat(true, true) /*?*/ // true
B.SemigroupAll.concat(true, false) /*?*/ // false

/*** concatAll ***/
// 해당 concat을 배열의 원소에 전부 적용
const semiSumAllStart10 = Semi.concatAll(N.SemigroupSum)(10)
semiSumAllStart10([3, 5, 5, 1, 2, 4]) /*?*/ // 30

const isPositiveX = (p: Point) => p.x >= 0
const isPositiveY = (p: Point) => p.y >= 0

/*** function - getSemigroup ***/
// 1. 이항 연산을 처리할 semigroup을 받음
const semigroupPredicate = FN.getSemigroup(B.SemigroupAll)<Point>()
// 2. 각각의 항에 적용할 함수를 받아서 단항 함수를 만듬
const isPositiveXY = semigroupPredicate.concat(isPositiveX, isPositiveY)

isPositiveXY({ x: 1, y: 1 }) // true
isPositiveXY({ x: 1, y: -1 }) // false
isPositiveXY({ x: -1, y: 1 }) // false
isPositiveXY({ x: -1, y: -1 }) // false

const isXGreaterThenY = (p: Point) => p.x > p.y

// 확장
const isPositiveXYAndXGreaterThenY = semigroupPredicate.concat(
  isPositiveXY,
  isXGreaterThenY
)

isPositiveXYAndXGreaterThenY({ x: 1, y: 1 }) /*?*/ // false
isPositiveXYAndXGreaterThenY({ x: 2, y: 1 }) /*?*/ // true
