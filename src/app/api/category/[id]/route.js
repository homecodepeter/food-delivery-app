import connectMongoDB from "@/libs/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
   const { id } = params;
   const {categoryName, img} = await req.json();
   await connectMongoDB();
   await Category.findByIdAndUpdate(id, {category: categoryName, img});
   return NextResponse.json({message: "Category Updated"}, { status: 200});
}

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const singleCategory = await Category.findOne({_id: id});
    return NextResponse.json(singleCategory)
}