// import React from "react"
// import { useState } from "react"
// import { Eye, EyeOff } from "lucide-react"
import { auth } from "./lib/firebase"
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
// import { Input } from "./components/ui/input"
// import { Button } from "./components/ui/button"
import './App.css'


import RegisterForm from "./components/molecules/registerForm"


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
    <main className="flex h-screen flex-col justify-center items-center">
      <Card className="h-13 w-1/3">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter you Email to Login</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm></RegisterForm>
        </CardContent>
       
      </Card>
    </main>
  )
}

export default App
