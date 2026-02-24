import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connectToDB from "@/lib/dbconnection";
import User from "@/models/user.model";

export async function GET(request) {
    await connectToDB();

    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json(
            { message: "Invalid token" },
            { status: 401 }
        );
    }
}
