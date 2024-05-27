"use client";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useEffect, useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useUser } from "@/context/User";
import { handleContactExchange, handleLike } from "@/lib/postHelper";
import { useRouter } from "next/navigation";


export default function PostHome({ post, search, mode }) {
  const [isLiked, setIsLiked] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const { user } = useUser();
  const [cpost, setCPost] = useState(post);
  const router = useRouter();
  const [interest, setInterest] = useState("Interested");

  const {
    address,
    area,
    bathrooms,
    bedrooms,
    colleges,
    description,
    hospital,
    landmark,
    liked,
    likedBy,
    photos,
    rent,
    interestedBy,
  } = cpost;

  useEffect(() => {
    if (user) {
      setIsLiked(likedBy.includes(user._id));
      setInterest(interestedBy.includes(user._id) ? "Contacted" : "Interested");
      // setInterest(createdBy._id === cpost.)
    }
  }, [likedBy, interestedBy, user]);

  useEffect(() => {
    const socket = new WebSocket("wss://ws-aw6a.onrender.com");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = async (event) => {
      console.log("fetch new like count data");
      await fetchData();
    };

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/post/${post._id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }
        const postData = await response.json();
        setCPost(postData);

        // Update isLiked and isInterested based on the new cpost data
        if (user) {
          setIsLiked(postData.likedBy.includes(user._id));
          setIsInterested(postData.interestedBy.includes(user._id));
        }
      } catch (error) {
        console.error(error);
      }
    };

    return () => {
      socket.close();
    };
  }, [post, user]);

  const handleL = () => {
    if (!user) {
      router.push("/");
    } else {
      handleLike(post._id, user._id).then((res) => {
        console.log(res);
        const socket = new WebSocket("wss://ws-aw6a.onrender.com");
        socket.onopen = () => {
          socket.send(1);
        };
      });
    }
  };

  const handleSubmit = () => {
    console.log("exchange details");
    setDrawerOpen(false);
    handleContactExchange(post.createdBy,user)
  };

  const handleEdit = () => {
    console.log("edit");
    router.push(`/edit-post/${cpost._id}`)
  };

  const handleInterest = () => {
    if (user) {
      if (cpost.createdBy._id === user._id) {
        setInterest("Your post");
      } else {
        setDrawerOpen(true);
      }
    } else {
      router.push("/");
    }
  };

  return (
    <Card className="mt-1">
      <CardContent>
        {photos.length > 0 && (
          <Carousel className="mx-8 my-2">
            <CarouselContent>
              {photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="">
                    <Card>
                      <CardContent className="flex items-center justify-center aspect-square">
                        <img
                          key={index}
                          src={photo}
                          alt={`Post photo ${index + 1}`}
                          className="w-full h-auto mt-2"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        <div className="mb-2">{description}</div>
        <div className="grid grid-cols-2 gap-4">
          {/* Left Side */}
          <div>
            <div className="mb-2">
              <strong>Address:</strong> {address}
            </div>
            <div className="mb-2">
              <strong>Area:</strong> {area}
            </div>
            <div className="mb-2">
              <strong>Rent:</strong> {rent}
            </div>
            <div className="mb-2">
              <strong>Bathrooms:</strong> {bathrooms}
            </div>
          </div>
          {/* Right Side */}
          <div>
            <div className="mb-2">
              <strong>Bedrooms:</strong> {bedrooms}
            </div>
            <div className="mb-2">
              <strong>Colleges:</strong> {colleges}
            </div>
            <div className="mb-2">
              <strong>Hospital:</strong> {hospital}
            </div>
            <div className="mb-2">
              <strong>Landmark:</strong> {landmark}
            </div>
          </div>
        </div>
        <div className="mb-2 flex justify-center items-center">
          <strong>Likes:</strong> {liked}
          <Button
            className={`ml-2 p-1 h-5 ${isLiked ? " text-white" : "text-black"}`}
            onClick={handleL}
          >
            {isLiked ? "Unlike" : "Like"}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="mt-[-25px]">
        {mode === "my" ? (
          <Button className="w-full" onClick={handleEdit}>
            Edit
          </Button>
        ) : (
          <Drawer open={drawerOpen}>
            <DrawerTrigger className="w-full">
              <Button
                className="w-full"
                onClick={handleInterest}
                disabled={isInterested}
              >
                {interest}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="flex justify-center items-center">
              <div className="w-1/2">
                <DrawerHeader>
                  <DrawerTitle>Detail of the seller</DrawerTitle>
                  <h1>Email: {post.createdBy?.email}</h1>
                  <p>
                    Name: {post.createdBy?.firstName} {post.createdBy?.lastName}
                  </p>
                  <p>Mobile: {post.createdBy?.mobileNumber}</p>
                  <DrawerDescription>
                    You can contact on these information and on submit your
                    information and seller information is exchanged via email.
                  </DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                  <Button onClick={handleSubmit}>Submit</Button>
                  <DrawerClose>
                    <Button
                      variant="outline"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </CardFooter>
    </Card>
  );
}
