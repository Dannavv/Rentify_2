import connectToDatabase from "@/lib/mongoose";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id } = await request.json();

  console.log({ id });

  await connectToDatabase();

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      _id: user._id,
      mobileNumber: user.mobileNumber,
      seller: user.seller,
    });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
