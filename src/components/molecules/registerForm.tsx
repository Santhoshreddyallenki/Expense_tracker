import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import {  useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl,  FormMessage } from "../ui/form"
import { Input } from "../ui/input"

import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../lib/firebase"

const formSchema = z.object({
  email: z.string().email("Invalid email address. Please enter a valid email address in the format example@example.com").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
  password: z.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10,}$/,{
    message: "Your password should be at least one lowercase letter, one uppercase letter, one digit, one special character (!, @, #, $, %, ^, &, *) And Minimum length of 10 characters "
  }),
  confirmPassword: z.string()
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
  });






const RegisterForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password:"",
            confirmPassword:"",
        },
      })
   async function onSubmit(values: z.infer<typeof formSchema>) {
         await  createUserWithEmailAndPassword(auth, values.email, values.password)
         console.log("user created")
      }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-start">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem >
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="" {...field}  />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /><FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} type="password"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    /><FormField
    control={form.control}
    name="confirmPassword"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <Input placeholder="" {...field} type="password"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
      <Button className="w-full" type="submit">Submit</Button>
    </form>
  </Form>
  )
}

export default RegisterForm