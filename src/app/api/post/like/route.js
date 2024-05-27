
import Post from "@/model/Post";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, userId } = await request.json();

  try {
    // Find the post by its ID
    const post = await Post.findById(id);

    if (!post) {
      // If no post is found with the provided ID, return a 404 response
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    let update;
    if (post.likedBy.includes(userId)) {
      // If the user has already liked the post, decrement likeCount and remove userId from likedBy
      update = {
        $inc: { liked: -1 },
        $pull: { likedBy: userId },
      };
    } else {
      // If the user has not liked the post yet, increment likeCount and add userId to likedBy
      update = {
        $inc: { liked: 1 },
        $push: { likedBy: userId },
      };
    }

    // Update the post with the new likeCount and likedBy array
    const updatedPost = await Post.findByIdAndUpdate(id, update, { new: true });

    // Return a success response
    return NextResponse.json(
      { message: "Post updated", post: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    // If an error occurs, return a 500 response
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
