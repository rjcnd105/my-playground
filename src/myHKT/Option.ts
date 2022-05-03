import {Struct} from "./common";

export const URI = 'Option'
export type URI = typeof URI

export interface None extends Struct<"None"> {
}

export interface Some<A> extends Struct<"Some"> {
    readonly value: A
}

export type Option<A> = None | Some<A>


declare module "./HKT" {
    interface URItoKind<A> {
        [URI]: Option<A>
    }
}
