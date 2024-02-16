import connectMongoDB from "@/libs/mongodb";
import Menu from "@/models/Menu";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name } = await req.json();
    await connectMongoDB();
    // Find items in the Menu collection that match the specified category name
    const category = await Menu.find({ category: name });;
    return NextResponse.json(category);
  } catch (error) {
    // Ensure that you return the response
    return NextResponse.json({ status: false, error });
  }
}
