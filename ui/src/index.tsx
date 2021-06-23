import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Modal from 'react-modal'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app'
import './index.css'

Modal.setAppElement('#root')

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
)
