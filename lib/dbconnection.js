import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Database is not defind");
}
let cached = global.mongoose || { conn: null, promise: null };

async function connectToDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI)
    }
    cached.conn = await cached.promise;
    global.mongoose = cached;
    return cached.conn;
}

export default connectToDB;