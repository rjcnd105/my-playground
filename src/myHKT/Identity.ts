const URI = "Identity"
type URI = typeof URI

export type Identity<A> = A

declare module "./HKT" {
    interface URItoKind<A> {
        [URI]: Identity<A>
    }
}

