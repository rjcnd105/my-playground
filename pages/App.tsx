import React from 'react'
import './App.css'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { flatten } from 'fp-ts/lib/Array'

const basePath = '/src'
type Routes = {
  path: string
  routes?: Routes[]
}
const allRoutes: Routes[] = [
  {
    path: 'fpts',
    routes: [
      {
        path: 'my_taskEither',
      },
      {
        path: 'my_option',
      },
    ],
  },
]

function joinPath(fullPath: string) {
  return fullPath.split('/').join('__')
}
function renderRoute(fullPath: string) {
  function FileLoad() {
    const file = import(fullPath)
    return <></>
  }
  return (
    <Route
      key={fullPath}
      path={joinPath(fullPath)}
      element={<FileLoad />}
    ></Route>
  )
}

function renderLinks(fullPath: string) {
  return (
    <>
      <NavLink key={fullPath} to={joinPath(fullPath)}>
        {fullPath}
      </NavLink>
      <br />
    </>
  )
}

function renderButtons(fullPath: string) {
  const pathEl: React.ReactNode[] = (() => {
    const temp: React.ReactNode[] = fullPath
      .split('/')
      .map((v, i) => (i === 0 ? v : `/${v}`))
    temp[temp.length - 1] = <mark>{temp[temp.length - 1]}</mark>
    return temp
  })()
  return (
    <>
      <button
        key={fullPath}
        style={{ padding: 4, fontSize: 16 }}
        onClick={() => {
          import(`${fullPath}?update=${Date.now()}`)
        }}
      >
        {pathEl}
      </button>
      <br />
    </>
  )
}

type RenderFn = (fullPath: string) => JSX.Element

function recursionRender(renderFn: RenderFn) {
  // @ts-ignore
  function recursion(routes: Routes[], beforePath = basePath) {
    return routes.map(({ routes, path }) => {
      const nextPath = `${beforePath}/${path}`
      return routes ? recursion(routes, nextPath) : renderFn(nextPath)
    })
  }

  return recursion
}

export default function App() {
  const buttons = flatten(recursionRender(renderButtons)(allRoutes))
  const links = flatten(recursionRender(renderLinks)(allRoutes))
  const routes = flatten(recursionRender(renderRoute)(allRoutes))

  return (
    <BrowserRouter>
      <>
        <h3>Load file button</h3>
        {buttons}

        <h3>Go Url</h3>
        <>{links}</>
        <Routes>
          <>{routes}</>
        </Routes>
      </>
    </BrowserRouter>
  )
}
