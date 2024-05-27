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
import { useUser } from "@/context/User";
import UploadImage from "@/lib/imageUpload";
import { createPost, handleUpdate } from "@/lib/postHelper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

// Define Zod schema
const postSchema = z.object({
  photos: z.any(),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  area: z.number().positive("Area must be a positive number"),
  rent: z.number().positive("Rent must be a positive number"),
  bedrooms: z.number().positive("Bedrooms must be a positive number"),
  bathrooms: z.number().positive().min("Bathrooms is required"),
  hospital: z.string().min(1, "Hospital is required"),
  colleges: z.string().min(1, "Colleges is required"),
  landmark: z.string().min(1, "Landmark is required"),
});

export function EditPostForm({ p }) {
  const router = useRouter();
  const path = usePathname();
  const [post, setPost] = React.useState(p);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      description: post.description,
      address: post.address,
      area: post.area,
      rent: post.rent,
      bedrooms: post.bedrooms,
      bathrooms: post.bathrooms,
      hospital: post.hospital,
      colleges: post.colleges,
      landmark: post.landmark,
    },
  });

  const { user } = useUser();

  const handleCancelClick = () => {
    console.log("Cancel button clicked");
    router.back();
  };

  const onSubmit = async (data) => {
    console.log(data);
    const urls = await UploadImage(data.photos);
    console.log(urls);
    data.photos = urls
    data.photos = [...data.photos, ...post.photos]
    console.log(data)

    handleUpdate(post._id, data).then((res)=>{
      if(res._id){
        router.push("/home")
        // router.back()
      }
    })
    // data.createdBy = user._id;
    // createPost(data).then((post) => {
    //   post.json().then((p) => {
    //     if (p?._id) {
    //       router.push("/home");
    //     }
    //   });
    // });
  };

  return (
    <Card className="w-auto mt-20">
      <CardHeader>
        <CardTitle>Edit Post</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <div className="flex flex-col mt-3 space-y-4">
                <Label htmlFor="photos">Photos</Label>
                <div className="flex space-x-2 w-auto h-auto">
                  {post.photos.length > 0 && (
                    <Carousel className="mx-12 my-2 w-full max-w-lg h-80">
                      <CarouselContent className="h-full">
                        {post.photos.map((photo, index) => (
                          <CarouselItem key={index}>
                            <div className=" w-full h-full relative">
                              {" "}
                              {/* Added relative class */}
                              <Card>
                                <CardContent className="aspect-w-4 aspect">
                                  <img
                                    key={index}
                                    src={photo}
                                    alt={`Post photo ${index + 1}`}
                                    className="object-cover w-full h-full"
                                    style={{ width:"auto", height: "300px" }}
                                  />
                                </CardContent>
                              </Card>
                              <button
                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => {
                                  const updatedPhotos = [...post.photos];
                                  updatedPhotos.splice(index, 1);
                                  setPost((prevPost) => ({
                                    ...prevPost,
                                    photos: updatedPhotos,
                                  }));
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  )}
                </div>
              </div>

              <div className="flex flex-col mt-3 space-y-1.5">
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
            </div>
            <div className="">
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
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
