import RegisterForm from "../components/molecules/registerForm"
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter, ./components/ui/card ./components/molecules/registerForm
  CardHeader,
  CardTitle,
} from "../components/ui/card"
const Register = () => {
  return (
    <main className="flex h-screen flex-col justify-center items-center">
    <Card className="h-13 w-1/3">
      <CardHeader>
        <CardTitle className="text-3xl">Register</CardTitle>
        <CardDescription className="text-2xl">Enter Your Details To Register</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm></RegisterForm>
      </CardContent>
    </Card>
  </main>
  )
}

export default Register