import React from 'react'
import { storesContext } from '../contexts'
import appStore from '../mobxModules/appStore'

type UseApp = typeof appStore.reg

const useApp: UseApp = <T,>(name: string, makeStore?: () => T) =>
  React.useContext(storesContext).appStore.reg<T>(name, makeStore)

export default useApp
