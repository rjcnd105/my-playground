type Is<T extends U, U> = T
type F = (...args: Array<any>) => any
type ComposeCurriedF<Fs extends Array<F>> =
  Fs extends [ Is<infer F1, F>, Is<infer F2, F>, ...Is<infer RestF, Array<F>> ]
    ? ReturnType<F1> extends infer R
      ? R extends F
        ? (...args: Parameters<F1>) => ComposeCurriedF<[ R, F2, ...RestF ]>
        : F2 extends (arg: R) => any
          ? ReturnType<F2> extends infer F2R
            ? F2R extends F
              ? (...args: Parameters<F1>) => ComposeCurriedF<[ F2R, ...RestF ]>
              : (...args: Parameters<F1>) => F2R
            : never
          : never
      : never
    : Fs extends [ infer F1 ]
      ? F1
      : never
export function composeWithCurriedFunction<Fs extends [ F, ...Array<F> ]>(...fns: Fs): ComposeCurriedF<Fs>