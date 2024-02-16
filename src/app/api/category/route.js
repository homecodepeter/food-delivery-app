import connectMongoDB from "@/libs/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { category, img } = await req.json();
    await connectMongoDB();
    await Category.create({category, img});
    return NextResponse.json({message: "Category Created!"}, {status: 201 })
} 

export async function GET() {
         await connectMongoDB();
         const today = new Date();
          today.setUTCHours(0, 0, 0, 0);

          const category = await Category.find().sort({ createdAt: -1 })
          return NextResponse.json(category)
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Category.findByIdAndDelete(id);
    return NextResponse.json({message: "Category Deleted"}, { status: 200 })
}