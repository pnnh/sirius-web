import React from 'react' 
import ReactDOM from 'react-dom' 
import './index.scss'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import $ from 'jquery'
import RandomPasswordPage from './pages/utils/random-password'
import { HomePage } from './pages/home/home'
 

const App = () => { 
  return <Router>
    <Routes> 
      <Route path="/utils/random/password" element={<RandomPasswordPage/>}/> 
      <Route path="/" element={<HomePage/>}/> 
    </Routes>
  </Router>
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.render(<App/>, rootElement)
}


