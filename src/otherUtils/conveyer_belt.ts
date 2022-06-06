class Except<T extends string = string> {
  constructor(public code: T) {}
}

export const conveyor_belt = <T extends ((a: any) => any | Except)[]>(
  fns: [...T]
) => {
  return function* (arg: Parameters<T[0]>[0]) {
    for (const fn of fns) {
      yield fn(arg)
    }
  }

  // no lazy
  // return (arg: Parameters<T[0]>[0]) =>
  //   fns.reduce((output, fn) => fn(output), arg)
}

const myConveyor1 = conveyor_belt([
  (str: string) => (str !== '10' ? parseInt(str) : new Except('NO TEN STRING')),
  (num: number) =>
    num <= 100 ? num * 2 : new Except('MUST NUMBER LESS THEN 100') /*?*/,
  (num: number) => [...new Array(10)].map((_, i) => num * i) /*?*/,
])

const myConveyor2 = conveyor_belt([
  (a: any) => (typeof a === 'string' ? new Except('string not allowed.') : a),
  (a: any) => (typeof a === 'number' ? new Except('number not allowed.') : a),
  (a: any) => (typeof a === 'boolean' ? new Except('boolean not allowed.') : a),
])

const conveyorLogger =
  <conveyorT extends ReturnType<typeof conveyor_belt>>(con: conveyorT) =>
  (arg: any) => {
    const iterator = con(arg)
    let lastValue: any

    while (true) {
      const it = iterator.next()
      if (it.value instanceof Except) return it.value.code

      if (it.done) return lastValue
      else {
        lastValue = it.value
      }
    }
  }

conveyorLogger(myConveyor1)('5') /*?*/ // [0, 5, 10, 15, 20, 25, 30, 35, 40 ,45]
conveyorLogger(myConveyor1)('10') /*?*/ // "NO TEN STRING"
conveyorLogger(myConveyor1)('102') /*?*/ // "MUST NUMBER LESS THEN 100"

conveyorLogger(myConveyor2)('102') /*?*/ // string not allowed.
conveyorLogger(myConveyor2)(142) /*?*/ // number not allowed.
conveyorLogger(myConveyor2)(true) /*?*/ // boolean not allowed.
conveyorLogger(myConveyor2)(function hihi() {
  return 'hihi'
}) /*?*/ // fn hihi
