import { NextResponse } from "next/server";
import connectToDB from "@/lib/dbconnection";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    await connectToDB();

    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json(
            { message: "Email and password are required" },
            { status: 400 }
        );
    }

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json(
            { message: "Invalid email or password" },
            { status: 401 }
        );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json(
            { message: "Invalid email or password" },
            { status: 401 }
        );
    }
    
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return NextResponse.json({
        success: true,
        token,
        user: { 
            id: user._id,
            email: user.email, 
            name: user.name 
        }
    })
}