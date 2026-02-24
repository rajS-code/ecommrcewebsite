import { NextResponse } from "next/server";
import connectToDB from "@/lib/dbconnection";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(request) {
    await connectToDB();

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
        return NextResponse.json(
            { message: "All fields are required" },
            { status: 400 }
        );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json(
            { message: "User already exists" },
            { status: 409 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
    });
    await user.save();

    return NextResponse.json({
        message: "User registered successfully",
        user: { email: user.email, name: user.name }
    }, { status: 201 });
}