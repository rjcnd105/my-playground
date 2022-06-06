const $let = (value, f) => f(value)
const composeWithCurriedFunction = (...fns) => {
  const takeF = (f, i) =>
    arg =>
      $let((f ?? fns[i])(arg), result =>
        typeof result === 'function'
          ? takeF(result, i)
          : i + 1 < fns.length
            ? takeF(takeF(null, i + 1)(result), i + 1)
            : result
      )
  return takeF(fns[0], 0)
}

module.exports.composeWithCurriedFunction = composeWithCurriedFunction