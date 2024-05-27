import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import connectToDatabase from "@/lib/mongoose";
import User from "@/model/User";
import MailOTP from "@/lib/mailOtp";

export async function POST(request) {
  const { firstName, lastName, email, mobileNumber, password, seller } =
    await request.json();
  await connectToDatabase();

  // Check if a user with the provided email or phone number already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { mobileNumber }],
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 200 }
    );
  }

  // Set verification expiration to 1 hour from now
  const verificationExpires = new Date();
  verificationExpires.setHours(verificationExpires.getHours() + 1); // 1 hour from now

  // Create the new user
  const verificationCode = crypto.randomInt(100000, 999999).toString();

  const hashedPassword = await bcrypt.hash(password, 10);

  const res = await User.create({
    firstName,
    lastName,
    email,
    mobileNumber,
    password: hashedPassword,
    verificationCode,
    verificationExpires,
    seller,
  });

  if (res?._id) {
    try {
      const mail = await MailOTP(email, verificationCode);
      console.log(mail);
    } catch (error) {
      console.log(error);
    }
  }

  return NextResponse.json({ _id: res._id }, { status: 201 });
}
