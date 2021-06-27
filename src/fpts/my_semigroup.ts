import * as EQ from 'fp-ts/Eq'
import * as Opt from 'fp-ts/Option'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import * as Semigroup from 'fp-ts/Semigroup'

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

Semigroup.reverse(firstSemi).concat(5, 10) /*?*/ // 10
