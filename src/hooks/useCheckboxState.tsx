import { useCallback, useMemo, useReducer } from 'react'

type CheckReducerActions =
  | {
      type: 'ADD' | 'REMOVE'
      value: string
    }
  | { type: 'CLEAR' }

function checkReducer(state: Set<string>, action: CheckReducerActions) {
  switch (action.type) {
    case 'ADD': {
      const newSet = new Set(state)
      newSet.add(action.value)
      return newSet
    }
    case 'REMOVE': {
      const newSet = new Set(state)
      newSet.delete(action.value)
      return newSet
    }

    case 'CLEAR': {
      return new Set<string>()
    }

    default:
      return state
  }
}

export function useCheckboxState(initialState: string[]) {
  const [checkSet, dispatch] = useReducer(checkReducer, new Set(initialState))
  const checkArr = useMemo(() => [...checkSet], [checkSet])

  const add = useCallback((value: string) => dispatch({ type: 'ADD', value }), [])
  const remove = useCallback((value: string) => dispatch({ type: 'REMOVE', value }), [])
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [])
  const isChecked = useCallback((value: string) => checkSet.has(value), [])

  return { values: checkArr, add, remove, clear, isChecked }
}
