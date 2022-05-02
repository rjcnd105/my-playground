import { Kind } from './HKT'

export const URI = 'Result'
export type URI = typeof URI

export interface Err<A> {
    readonly _tag: 'Err'
    readonly value: A
}
export interface Ok<A> {
    readonly _tag: 'Ok'
    readonly value: A
}

export type Result<A> = Err<A> | Ok<A>

export const err = <A>(v: A): Err<A> => {
    return {
        get _tag() { return 'Err' as const },
        get value() { return v }
    }
}
export const ok = <A>(v: A): Ok<A> => {
    return {
        get _tag() { return 'Ok' as const },
        get value() { return v }
    }
}

declare module "./HKT" {
    interface URItoKind<A> {
        [URI]: Result<A>
    }
}

// constructor
export class From {

}

