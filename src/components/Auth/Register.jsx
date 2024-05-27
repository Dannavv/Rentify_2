"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";

import { registerUser } from "@/lib/helper";

// Define Zod schema
const loginSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    mobileNumber: z
      .string()
      .regex(/^\d{10}$/, "Mobile number must be 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const router = useRouter();
  const path = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleCancelClick = () => {
    console.log("Cancel button clicked");
    // Add any other logic you want to handle on cancel button click
    // router.push("/");
    router.back();
  };

  const onSubmit = (data) => {
    const userType = path.includes("seller") ? true : false;

    // alert(userType);
    // Add userType to the form data
    const formData = { ...data, seller: userType };
    // console.log(formData);

    registerUser(formData)
      .then((response) => {
        // Handle successful registration
        response.json().then((res)=>{
          console.log(res)
          if(res?._id){
            router.push(`/verification/${res._id}`)
          }
        })
        // console.log(response);
      })
      .catch((error) => {
        // Handle registration error
        console.error(error);
      });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-600">{errors.lastName.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                type="text"
                placeholder="Mobile Number"
                {...register("mobileNumber")}
              />
              {errors.mobileNumber && (
                <p className="text-red-600">{errors.mobileNumber.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          <CardFooter className="mt-5 flex justify-between">
            <Button variant="outline" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button type="submit">Sign Up</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
