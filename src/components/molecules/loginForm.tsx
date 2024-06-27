import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
 
const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email address. Please enter a valid email address in the format example@example.com")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
  password: z.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10,}$/, {
    message: "Your password should be at least one lowercase letter, one uppercase letter, one digit, one special character (!, @, #, $, %, ^, &, *) and minimum length of 10 characters",
  }),
});
 
const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null); // Update the type to string | null
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((UserCredential) => {
        const user = UserCredential.user;
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(`${errorCode}: ${errorMessage}`); // Update the error state
      });
  }
 
  function togglePasswordVisibility() {
    setPasswordVisibility((prev) => !prev);
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-start">
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
        {error && (
          <div className="text-red-500">
            {error}
          </div>
        )}
        <Button className="w-full" type="submit">Login</Button>
      </form>
    </Form>
  );
};
 
export default LoginForm;