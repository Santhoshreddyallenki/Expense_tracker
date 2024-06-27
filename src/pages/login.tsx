import { Link } from "react-router-dom"
import LoginForm from "../components/molecules/loginForm"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader,
  CardTitle,
} from "../components/ui/card"
const Login = () => {
  return (
    <main className="flex h-screen flex-col justify-center items-center">
    <Card className="h-13 w-1/4">
      <CardHeader>
        <CardTitle className="text-3xl text-center">Login</CardTitle>
        <CardDescription className="text-2xl text-center">Enter Your Login Credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col justify-between">
        <Link to={"/register"} className="text-center font-semibold underline decoration-1 cursor-pointer">New Here ? Create new Account</Link>
        <p className="text-center font-semibold underline decoration-1 cursor-pointer">Forgot Password? <a href="/register"></a></p>
      </CardFooter>
    </Card>
  </main>
  )
}

export default Login