import {URIS} from "./HKT";
import * as Result from './Result'

export const URI = 'Option'
export type URI = typeof URI

export interface None {
    readonly _tag: 'None'
}

export interface Some<A> {
    readonly _tag: 'Some'
    readonly value: A
}

export type Option<A> = None | Some<A>


declare module "./HKT" {
    interface URItoKind<A> {
        [URI]: Option<A>
    }
}
