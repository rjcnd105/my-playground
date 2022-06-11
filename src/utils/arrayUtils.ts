const matchRemove =
  <T>(matchFn: (a: T, b: T) => boolean = (a, b) => a === b) =>
    (arr: T[], removeItem: T) => {
      for (let i = 0; i < arr.length; i++) {
        if (matchFn(arr[i], removeItem)) {
          return [...arr].splice(i, 1)
        }
      }

      return arr
    }

const arrUtils = { matchRemove }
export default arrUtils
