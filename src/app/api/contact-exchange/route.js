import MailExchange from "@/lib/mailExchange"
import { NextResponse } from "next/server"

export async function POST(request) {
    const { seller, buyer } = await request.json()

    // console.log({seller, buyer})
    await MailExchange(seller, buyer)
    return NextResponse.json({message:"sucessfully contact exchanged"})
}