import connectToDatabase from "@/lib/mongoose";
import Post from "@/model/Post";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, data } = await request.json();


//   console.log(id,data)

  await connectToDatabase();

  try {
    // Find the post by its ID and update it with the provided details
    const post = await Post.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!post) {
      console.error("Post not found");
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
