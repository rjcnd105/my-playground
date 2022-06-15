import type { IO } from 'fp-ts/IO'
import type { Either } from 'fp-ts/lib/Either'
import { isLeft } from 'fp-ts/lib/Either'
import { useCallback, useState } from 'react'

const defaultOpt = {
  defaultHideError: true,
}
const useError = <E, A>(value: Either<E, A>, opt?: typeof defaultOpt) => {
  const _opt = Object.assign({}, defaultOpt, opt)
  const [isHideError, setIsHideError] = useState<boolean>(_opt.defaultHideError)
  const showError = useCallback(() => setIsHideError(false), [])
  const hiddenError = useCallback(() => setIsHideError(true), [])
  const error = isLeft(value) ? value.left : null
  return {
    value,
    error,
    viewError: isHideError ? null : error,
    showError,
    hiddenError,
  }
}

export default useError
