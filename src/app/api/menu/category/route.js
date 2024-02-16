import connectMongoDB from "@/libs/mongodb";
import Menu from "@/models/Menu";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connectMongoDB();
  
    const { name } = req.body;
  
    if (!req.query || !req.query.name) {
        return NextResponse.json({ message: 'Name parameter is required.' });
      }
  
    const category = await Menu.find({ category: name });
    return NextResponse.json(category);
  }
