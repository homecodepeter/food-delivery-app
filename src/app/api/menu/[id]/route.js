import connectMongoDB from "@/libs/mongodb";
import Menu from "@/models/Menu";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
   const { id } = params;
   const {title, desc, price, category, subcategory, categoryImg, dish} = await req.json();
   await connectMongoDB();
   await Menu.findByIdAndUpdate(id, {title, desc, price, category, subcategory, categoryImg, dish});
   return NextResponse.json({message: "Menu Updated"}, { status: 200});
}

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const singleMenu = await Menu.findOne({_id: id});
    return NextResponse.json(singleMenu)
}