import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './pages/register'
import Home from './pages/home'
import Login from './pages/login'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
