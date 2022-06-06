type OrderingFn = (ordering: Ordering) => Ordering
type Ordering = -1 | 0 | 1

type Eq<A> = {
    equals(a: A, b: A): boolean,
}

// Ord
interface Ord<A> extends Eq<A> {
    compare(a: A, b: A): Ordering
}

type FromCompareT<A> = (compare: Ord<A>['compare']) => Ord<A>
const fromCompare: <A>(compare: Ord<A>['compare']) => Ord<A> = (compare) => ({
    equals: (a, b) => compare(a, b) === 0,
    compare
})


const defaultEq = <A>() => (a:A, b: A) => a === b
// Eq

const numEq = defaultEq<number>()
const strEq = defaultEq<string>()
const dateEq = defaultEq<Date>()

const fromOrd = <A>(ord: Ord<A>) => ({
    equals: ord.equals
}) as Eq<A>


const reverse = (ordering: Ordering) => -(ordering) as Ordering
const numAsc: Ord<number>['compare'] = (a, b) => (numEq(a, b) ? 0 : a < b ? -1 : 1) as Ordering
const strAsc: Ord<string>['compare'] = (a, b) => (strEq(a, b) ? 0 : a < b ? -1 : 1) as Ordering
const dateAsc: Ord<Date>['compare'] = (a, b) => (dateEq(a, b) ? 0 : a < b ? -1 : 1) as Ordering

const numDesc: Ord<number>['compare'] = (a, b) => reverse(numAsc(a, b));
const strDesc: Ord<string>['compare'] = (a, b) => reverse(strAsc(a, b));
const dateDesc: Ord<Date>['compare'] = (a, b) => reverse(dateAsc(a, b));

[1,5,4,7,3,5,2,3,5,1].sort(numAsc) /*?*/

export const ordUtils = {
    reverse,
    fromCompare,
    numAsc,
    strAsc,
    dateAsc,
    numDesc,
    strDesc,
    dateDesc

}

const eqUtils = {
    numEq,
    strEq,
}