import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectMongoDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ status: false, msg: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ status: false, msg: 'Invalid credentials' });
    }

    // Omit password from the response
    const { password: _, ...userDataWithoutPassword } = user.toObject();

    return NextResponse.json({ status: true, user: userDataWithoutPassword });
  } catch (error) {
    // Ensure that you return the response
    return NextResponse.json({ status: false, error });
  }
}
