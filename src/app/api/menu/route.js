import connectMongoDB from "@/libs/mongodb";
import Menu from "@/models/Menu";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { title, desc, dish, prices, category, extraOptions } = await req.json();
   console.log({ title, desc, dish, prices, category, extraOptions }) 
    await connectMongoDB();
    await Menu.create({title, desc, dish, prices, extraOptions, category});
    return NextResponse.json({message: "Menu Created!"}, {status: 201 })
} 

export async function GET() {
         await connectMongoDB();
         const today = new Date();
          today.setUTCHours(0, 0, 0, 0);

          const menu = await Menu.find().sort({ createdAt: -1 })
          return NextResponse.json(menu)
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Menu.findByIdAndDelete(id);
    return NextResponse.json({message: "Menu Deleted"}, { status: 200 })
}