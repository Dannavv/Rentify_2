"use client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

import { loginUser } from "@/lib/helper"
import { setCookie } from "@/lib/cookie"
import { useUser } from "@/context/User"
// Define Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export function CardWithForm() {
  const router = useRouter();
  const {user,setUser} = useUser()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleCancelClick = () => {
    console.log("Cancel button clicked");
    // Add any other logic you want to handle on cancel button click
    // router.push("/");
    router.back()
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // Add any other logic you want to handle on login button click
    loginUser(data).then((res)=>{
      res.json().then((user)=>{
        console.log(user)
        // save in context
        setCookie("id",user._id,30)
        setUser(user)
        router.push("/home")
      })
    })
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" placeholder="Password" {...register("password")} />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
          </div>
          <CardFooter className="mt-4 flex justify-between">
            <Button variant="outline" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button type="submit">Login</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
