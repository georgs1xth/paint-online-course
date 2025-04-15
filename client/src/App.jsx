import './App.css'
import Canvas from './components/Canvas'
import SettingBar from './components/SettingBar'
import Toolbar from './components/Toolbar'
import "./styles/app.scss"
import {BrowserRouter, Routes, Navigate, Route} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <div className='app'>
      <Routes>
        <Route path='/:id' element={
          <>
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
          </>
        }>
        </Route>
        <Route path='/' element={
          <>
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
            <Navigate to={`/f${(+new Date()).toString(16)}`} replace/>
          </>
        }></Route>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
