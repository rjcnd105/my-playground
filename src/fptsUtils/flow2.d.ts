export function pipe<A>(a: A): A
export function pipe<A, B>(a: A, ab: (a: A) => B): B

export function flow2<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C>(
  abc: (...a: A) => (...b: B) => C
): (...a: A) => (...b: B) => C

export function flow2<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C, D>(
  abc: (...a: A) => (...b: B) => C,
  cd: (c: C) => D
): (...a: A) => (...b: B) => D

export function flow2<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C, D, E>(
  abc: (...a: A) => (...b: B) => C,
  cd: (c: C) => D,
  de: (c: D) => E
): (...a: A) => (...b: B) => E

export function flow2<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C, D, E, F>(
  abc: (...a: A) => (...b: B) => C,
  cd: (c: C) => D,
  de: (c: D) => E,
  ef: (c: E) => F
): (...a: A) => (...b: B) => F

export function flow2<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C, D, E, F, G>(
  abc: (...a: A) => (...b: B) => C,
  cd: (c: C) => D,
  de: (c: D) => E,
  ef: (c: E) => F,
  fg: (c: F) => G
): (...a: A) => (...b: B) => G

export function flow2<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C, D, E, F, G, H>(
  abc: (...a: A) => (...b: B) => C,
  cd: (c: C) => D,
  de: (c: D) => E,
  ef: (c: E) => F,
  fg: (c: F) => G,
  gh: (c: G) => H,
): (...a: A) => (...b: B) => H

export function flow2<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C, D, E, F, G, H, I>(
  abc: (...a: A) => (...b: B) => C,
  cd: (c: C) => D,
  de: (c: D) => E,
  ef: (c: E) => F,
  fg: (c: F) => G,
  gh: (c: G) => H,
  hi: (c: H) => I,
): (...a: A) => (...b: B) => I

export function flow2<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C, D, E, F, G, H, I, J>(
  abc: (...a: A) => (...b: B) => C,
  cd: (c: C) => D,
  de: (c: D) => E,
  ef: (c: E) => F,
  fg: (c: F) => G,
  gh: (c: G) => H,
  hi: (c: H) => I,
  ij: (i: I) => J
): (...a: A) => (...b: B) => J

export function flow2<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C, D, E, F, G, H, I, J, K>(
  abc: (...a: A) => (...b: B) => C,
  cd: (c: C) => D,
  de: (c: D) => E,
  ef: (c: E) => F,
  fg: (c: F) => G,
  gh: (c: G) => H,
  hi: (c: H) => I,
  ij: (i: I) => J,
  jk: (i: J) => K
): (...a: A) => (...b: B) => K

export declare function flow<A extends ReadonlyArray<unknown>, B>(ab: (...a: A) => B): (...a: A) => B
export function flow<A extends ReadonlyArray<unknown>, B, C>(
  ab: (...a: A) => B,
  bc: (b: B) => C
): (...a: A) => C
export function flow<A extends ReadonlyArray<unknown>, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (...a: A) => D
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): (...a: A) => E
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (...a: A) => F
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): (...a: A) => G
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): (...a: A) => H
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): (...a: A) => I
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): (...a: A) => J