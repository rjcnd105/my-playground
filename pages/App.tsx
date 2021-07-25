import clsx from 'clsx'
import React from 'react'
import './App.css'
import css2 from './App2.module.css'

export default function App() {
  console.log(css2)
  return (
    <div className={clsx('page_app', css2.sss, 'active')}>
      <div className="hello">hello, react with vite2~~</div>
      <div className="ddd">
        dddddd
        <div className="aaa">aaaaa</div>
      </div>
    </div>
  )
}
