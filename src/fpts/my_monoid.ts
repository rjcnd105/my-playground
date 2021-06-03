import { Ordering } from 'fp-ts/Ordering'

// type t = Monoid<Ordering>

const bool2Ordering = (b: boolean): Ordering => (b ? 1 : -1)
// const ordering2Bool = (ordering: Ordering): boolean => {
//   if (ordering === 1) return true
//   return false
// }
//
// const d = [3, 6, 3, 9, 1, 3]
// d.sort((a, b) => {
//   console.log(a, b)
//   return bool2Ordering(a > b)
// }) /*?*/
