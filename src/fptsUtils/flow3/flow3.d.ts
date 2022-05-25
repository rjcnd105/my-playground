export function flow3<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C extends ReadonlyArray<unknown>, D>(
  abcd: (...a: A) => (...b: B) => (...c: C) => D
): (...a: A) => (...b: B) => (...c: C) => D

export function flow3<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C extends ReadonlyArray<unknown>, D, E>(
  abcd: (...a: A) => (...b: B) => (...c: C) => D,
  de: (d: D) => E
): (...a: A) => (...b: B) => (...c: C) => E

export function flow3<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C extends ReadonlyArray<unknown>, D, E, F>(
  abcd: (...a: A) => (...b: B) => (...c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (...a: A) => (...b: B) => (...c: C) => F

export function flow3<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C extends ReadonlyArray<unknown>, D, E, F, G>(
  abcd: (...a: A) => (...b: B) => (...c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
): (...a: A) => (...b: B) => (...c: C) => G

export function flow3<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C extends ReadonlyArray<unknown>, D, E, F, G, H>(
  abcd: (...a: A) => (...b: B) => (...c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
): (...a: A) => (...b: B) => (...c: C) => H

export function flow3<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C extends ReadonlyArray<unknown>, D, E, F, G, H, I>(
  abcd: (...a: A) => (...b: B) => (...c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
): (...a: A) => (...b: B) => (...c: C) => I

export function flow3<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C extends ReadonlyArray<unknown>, D, E, F, G, H, I, J>(
  abcd: (...a: A) => (...b: B) => (...c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
): (...a: A) => (...b: B) => (...c: C) => J

export function flow3<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C extends ReadonlyArray<unknown>, D, E, F, G, H, I, J, K>(
  abcd: (...a: A) => (...b: B) => (...c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
): (...a: A) => (...b: B) => (...c: C) => K

export function flow3<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>, C extends ReadonlyArray<unknown>, D, E, F, G, H, I, J, K, L>(
  abcd: (...a: A) => (...b: B) => (...c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
): (...a: A) => (...b: B) => (...c: C) => L