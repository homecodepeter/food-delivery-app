import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
     try {
        const { role, name, email, password } = await req.json();
        const hashPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({role, name, email, password: hashPassword })
   
        return NextResponse.json({Message: "User registerd."}, {status: 201});
     } catch (error) {
        return NextResponse.json({Message: "error Occur While registering the user"}, {status: 500})
     }
}

export async function GET() {
   try {
      await connectMongoDB();
      const users = await User.find();
      console.log(users)
      return NextResponse.json(users)
   } catch (error) {
      return NextResponse.json({Message: "error Occur While getting the users"}, {status: 500})

   }
}