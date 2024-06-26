import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'

import Register from './pages/register'
import Home from './pages/home'
import Login from './pages/login'


function App() {

  
 
//  const [passwordVisibility, setPasswordVisibility] = useState("password")

//  function showPassword(passwordVisibility){
//   if( passwordVisibility=="text"){
//     setPasswordVisibility("password")
//   }else{
//     setPasswordVisibility("text")
//   }

//  }

  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>
  // <Register></Register>
  )
}

export default App
