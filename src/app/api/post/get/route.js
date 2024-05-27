import connectToDatabase from "@/lib/mongoose";
import Post from "@/model/Post";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectToDatabase();
  
    const posts = await Post.find().populate("createdBy", "firstName lastName email mobileNumber");
  
    return NextResponse.json(posts);
  }