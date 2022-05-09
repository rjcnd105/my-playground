import * as IO from 'fp-ts/lib/IO'
import * as IOE from 'fp-ts/lib/IOEither'
import * as IOO from 'fp-ts/lib/IOOption'
import { pipe } from 'fp-ts/lib/function'


function t1() {
  const a = IO.of(10)
  a() /*?*/ // 10

  pipe(a, IO.ap )
}

declare const ex_ap: <A>(fa: IO.IO<A>) => <B>(fab: IO.IO<(a: A) => B>) => IO.IO<B>
declare const ex_apS: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: IO.IO<B>
) => (fa: IO.IO<A>) => IO.IO<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>


t1()