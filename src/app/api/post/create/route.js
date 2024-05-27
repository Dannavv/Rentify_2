import connectToDatabase from "@/lib/mongoose";
import Post from "@/model/Post";
import User from "@/model/User";

import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    rent,
    address,
    area,
    bathrooms,
    bedrooms,
    colleges,
    description,
    hospital,
    landmark,
    photos,
    createdBy,
  } = await request.json();

  await connectToDatabase();

  try {
    // Create the post
    const post = await Post.create({
      rent,
      address,
      area,
      bathrooms,
      bedrooms,
      colleges,
      description,
      hospital,
      landmark,
      photos,
      createdBy,
      likedBy: [], // Initialize likedBy as an empty array
      interestedBy:[]
    });

    // Find the user with the createdBy _id
    const user = await User.findById(createdBy);

    if (user) {
      // Append the new post's _id to the user's posts array
      user.posts.push(post._id);
      // Save the updated user
      await user.save();
    } else {
      // Handle the case where the user is not found
      console.error("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
