import connectToDatabase from "@/lib/mongoose";
import Post from "@/model/Post";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectToDatabase();

    const { search } = await request.json();
    console.log(search)
    
  
    const posts = await Post.find({
        // Search in any field using $or and $regex
        $or: [
            { address: { $regex: search, $options: "i" } }, // Example: Search in the address field
            { area: { $regex: search, $options: "i" } }, // Example: Search in the area field
            { description: { $regex: search, $options: "i" } }, // Example: Search in the description field
            // Add more fields as needed
        ]
    }).populate("createdBy", "firstName lastName email mobileNumber");
  
    return NextResponse.json(posts);
}
