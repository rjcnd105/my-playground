// TODO
// 왜 멋대로 배열로 바꾸래
/***
 * @example
 * iterMapValues(new Map([['a', 10], ['b', 20]]), v => v + 1) :> [11, 21]
 ***/
// const iterMapValues = <K, V, U>(map: Map<K, V>, iterator: (value?: V, index?: number, array?: V[]) => U) => {
//   return Array.from(map.values()).map(iterator)
// }
/***
 * @example
 * iterMapKeys(new Map([['a', 10], ['b', 20]]), k => k + 1) :> ['a1', 'a2']
 ***/
// const iterMapKeys = <K, V, U>(map: Map<K, V>, iterator: (value?: K, index?: number, array?: K[]) => U) => {
//   return Array.from(map.keys()).map(iterator)
// }

export default iterMap
