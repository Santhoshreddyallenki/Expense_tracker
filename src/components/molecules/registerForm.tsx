import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
 
const formSchema = z.object({
  fullname: z.string().min(2, "First name must be at least 2 characters long"),
  email: z
    .string()
    .email("Invalid email address. Please enter a valid email address in the format example@example.com")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
  password: z.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10,}$/, {
    message: "Your password should be at least one lowercase letter, one uppercase letter, one digit, one special character (!, @, #, $, %, ^, &, *) and minimum length of 10 characters",
  }),
  confirmPassword: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["confirmPassword"],
    });
  }
});
 
const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
 
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
await createUserWithEmailAndPassword(auth, values.email, values.password);
    console.log("user created");
  }
 
  function togglePasswordVisibility() {
    setPasswordVisibility((prev) => !prev);
  }
 
  function toggleConfirmPasswordVisibility() {
    setConfirmPasswordVisibility((prev) => !prev);
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-start">
        <FormField control={form.control} name="fullname" render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Full Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input placeholder="Password" {...field} type={passwordVisibility ? "text" : "password"} />
                {passwordVisibility ? (
                  <EyeOff className="absolute right-2 top-2 cursor-pointer select-none" onClick={togglePasswordVisibility} />
                ) : (
                  <Eye className="absolute right-2 top-2 cursor-pointer select-none" onClick={togglePasswordVisibility} />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input placeholder="Confirm Password" {...field} type={confirmPasswordVisibility ? "text" : "password"} />
                {confirmPasswordVisibility ? (
                  <EyeOff className="absolute right-2 top-2 cursor-pointer select-none" onClick={toggleConfirmPasswordVisibility} />
                ) : (
                  <Eye className="absolute right-2 top-2 cursor-pointer select-none" onClick={toggleConfirmPasswordVisibility} />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <Button className="w-full" type="submit">Submit</Button>
      </form>
    </Form>
  );
}
 
export default RegisterForm;