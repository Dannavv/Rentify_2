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
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UploadImage from "@/lib/imageUpload";
import { createPost } from "@/lib/postHelper";
import { useUser } from "@/context/User";

// Define Zod schema
const postSchema = z.object({
  photos: z.any(),
  description: z.string().min("Description is required"),
  address: z.string().min(1, "Address is required"),
  area: z.number().positive("Area must be a positive number"),
  rent: z.number().positive("Rent must be a positive number"),
  bedrooms: z.number().positive("Bedrooms must be a positive number"),
  bathrooms: z.number().positive().min( "Bathrooms is required"),
  hospital: z.string().min("Hospital is required"),
  colleges: z.string().min("Colleges is required"),
  landmark: z.string().min("Landmark is required"),
});

export function CreatePostForm() {
  const router = useRouter();
  const path = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  const {user} = useUser()

  const handleCancelClick = () => {
    console.log("Cancel button clicked");
    // Add any other logic you want to handle on cancel button click
    // router.push("/");
    router.back();
  };

  const onSubmit = async (data) => {
    console.log(data);
    const urls = await UploadImage(data.photos);
    console.log(urls);
    UploadImage(data.photos).then((urls) => {
      data.photos = urls;
      data.createdBy = user._id;
      createPost(data).then((post) => {
        post.json().then((p) => {
          if (p?._id) {
            router.push("/home");
          }
        });

        // console.log(post)
      });
    });
  };

  return (
    <Card className="w-auto">
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="grid grid-cols-2 gap-4">
            <div class="">
              <div className="flex flex-col mt-3 space-y-1.5">
                <Label htmlFor="photos">Photos</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  {...register("photos")}
                />

                {errors.photos && (
                  <p className="text-red-600">{errors.photos.message}</p>
                )}
              </div>
              <div className="flex flex-col mt-3 space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  placeholder="Type about the house here."
                  id="description"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-600">{errors.description.message}</p>
                )}
              </div>
              <div className="flex flex-col mt-3 space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  placeholder="Address"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-red-600">{errors.address.message}</p>
                )}
              </div>
              <div className="flex flex-col mt-3 space-y-1.5">
                <Label htmlFor="area">Area</Label>
                <Input
                  type="number"
                  placeholder="Area in sqft"
                  {...register("area", { valueAsNumber: true })}
                />
                {errors.area && (
                  <p className="text-red-600">{errors.area.message}</p>
                )}
              </div>
              <div className="flex flex-col mt-3 space-y-1.5">
                <Label htmlFor="rent">Rent</Label>
                <Input
                  type="number"
                  placeholder="Rent"
                  {...register("rent", { valueAsNumber: true })}
                />
                {errors.rent && (
                  <p className="text-red-600">{errors.rent.message}</p>
                )}
              </div>
            </div>
            <div class="">
              <div className="flex flex-col mt-3 space-y-1.5">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  type="number"
                  placeholder="Bedrooms"
                  {...register("bedrooms", { valueAsNumber: true })}
                />
                {errors.bedrooms && (
                  <p className="text-red-600">{errors.bedrooms.message}</p>
                )}
              </div>
              <div className="flex flex-col mt-3 space-y-1.5">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  type="number"
                  placeholder="Bathrooms"
                  {...register("bathrooms", { valueAsNumber: true })}
                />
                {errors.bathrooms && (
                  <p className="text-red-600">{errors.bathrooms.message}</p>
                )}
              </div>
              <div className="flex flex-col mt-3 space-y-1.5">
                <Label htmlFor="hospital">Hospital</Label>
                <Input
                  type="text"
                  placeholder="Hospital"
                  {...register("hospital")}
                />
                {errors.hospital && (
                  <p className="text-red-600">{errors.hospital.message}</p>
                )}
              </div>
              <div className="flex flex-col mt-3 space-y-1.5">
                <Label htmlFor="colleges">Colleges</Label>
                <Input
                  type="text"
                  placeholder="Colleges"
                  {...register("colleges")}
                />
                {errors.colleges && (
                  <p className="text-red-600">{errors.colleges.message}</p>
                )}
              </div>
              <div className="flex flex-col mt-3 space-y-1.5">
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  type="text"
                  placeholder="Landmark"
                  {...register("landmark")}
                />
                {errors.landmark && (
                  <p className="text-red-600">{errors.landmark.message}</p>
                )}
              </div>
            </div>
          </div>
          <CardFooter className="mt-5 flex justify-between">
            <Button variant="outline" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
