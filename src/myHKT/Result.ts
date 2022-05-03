import {Struct} from "./common";

export const URI = 'Result'
export type URI = typeof URI

class Err<A> implements Struct<'Err'> {
    readonly _tag = 'Err'

    constructor(public readonly value: A) {
    }
}

class Ok<A> implements Struct<'Ok'> {
    readonly _tag = 'Ok'

    constructor(public readonly value: A) {
    }
}

export type Result<A> = Err<A> | Ok<A>

export function isEq(t1: Result<any>) {
    return (t2: Result<any>) => {
        if (t1._tag !== t2._tag) return false
        return t1.value === t2.value;
    }
}

export function isErr(t: Struct<any>): t is Struct<'Err'> {
    return t._tag === 'Err'
}

export function isOk(t: Struct<any>): t is Struct<'Ok'> {
    return t._tag === 'Ok'
}

export function errorThrown<T>(r: Result<T>) {
    if (isErr(r)) throw Error
    return r
}

export function unwrap<T>(r: Result<T>) {
    return r.value
}


declare module "./HKT" {
    interface URItoKind<A> {
        [URI]: Result<A>
    }
}

