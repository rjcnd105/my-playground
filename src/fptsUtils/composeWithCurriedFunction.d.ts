type Is<T extends U, U> = T
type F = (...args: Array<any>) => any
type ConcatCurriedF<Fs extends Array<F>> =
  Fs extends [ Is<infer F1, F>, Is<infer F2, F>, ...Is<infer RestF, Array<F>> ]
    ? ReturnType<F1> extends infer R
      ? R extends F
        ? (...args: Parameters<F1>) => ConcatCurriedF<[ R, F2, ...RestF ]>
        : F2 extends (arg: R) => any
          ? (...args: Parameters<F1>) => ConcatCurriedF<[ F2, ...RestF ]>
          : never
      : never
    : Fs extends [ Is<infer F1, F> ]
      ? F1
      : never

export function composeWithCurriedFunction<Fs extends [ F, ...Array<F> ]>(...fns: Fs): ConcatCurriedF<Fs>
export function composeWithCurriedFunction<
  AB extends F,
  BC extends F
  >(
  ab: AB,
  bc: BC
): ConcatCurriedF<[ AB, BC ]>
export function composeWithCurriedFunction<
  AB extends F,
  BC extends F,
  CD extends F
  >(
  ab: AB,
  bc: BC,
  cd: CD
): ConcatCurriedF<[ AB, BC, CD ]>
export function composeWithCurriedFunction<
  AB extends F,
  BC extends F,
  CD extends F,
  DE extends F
  >(
  ab: AB,
  bc: BC,
  cd: CD,
  de: DE
): ConcatCurriedF<[ AB, BC, CD, DE ]>
export function composeWithCurriedFunction<
  AB extends F,
  BC extends F,
  CD extends F,
  DE extends F,
  EF extends F
  >(
  ab: AB,
  bc: BC,
  cd: CD,
  de: DE,
  ef: EF
): ConcatCurriedF<[ AB, BC, CD, DE, EF ]>
export function composeWithCurriedFunction<
  AB extends F,
  BC extends F,
  CD extends F,
  DE extends F,
  EF extends F,
  FG extends F
  >(
  ab: AB,
  bc: BC,
  cd: CD,
  de: DE,
  ef: EF,
  fg: FG
): ConcatCurriedF<[ AB, BC, CD, DE, EF, FG ]>
export function composeWithCurriedFunction<
  AB extends F,
  BC extends F,
  CD extends F,
  DE extends F,
  EF extends F,
  FG extends F,
  GH extends F
  >(
  ab: AB,
  bc: BC,
  cd: CD,
  de: DE,
  ef: EF,
  fg: FG,
  gh: GH
): ConcatCurriedF<[ AB, BC, CD, DE, EF, FG, GH ]>
export function composeWithCurriedFunction<
  AB extends F,
  BC extends F,
  CD extends F,
  DE extends F,
  EF extends F,
  FG extends F,
  GH extends F,
  HI extends F
  >(
  ab: AB,
  bc: BC,
  cd: CD,
  de: DE,
  ef: EF,
  fg: FG,
  gh: GH,
  hi: HI
): ConcatCurriedF<[ AB, BC, CD, DE, EF, FG, GH, HI ]>
export function composeWithCurriedFunction<
  AB extends F,
  BC extends F,
  CD extends F,
  DE extends F,
  EF extends F,
  FG extends F,
  GH extends F,
  HI extends F,
  IJ extends F
  >(
  ab: AB,
  bc: BC,
  cd: CD,
  de: DE,
  ef: EF,
  fg: FG,
  gh: GH,
  hi: HI,
  ij: IJ
): ConcatCurriedF<[ AB, BC, CD, DE, EF, FG, GH, HI, IJ ]>

