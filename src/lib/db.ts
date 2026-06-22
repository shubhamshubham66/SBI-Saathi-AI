import mongoose, { type Mongoose } from "mongoose";

/**
 * MongoDB connection helper.
 *
 * Next.js dev mode hot-reloads modules, which can open a new DB connection on
 * every change and exhaust the connection pool. To avoid that, we cache the
 * connection on the Node.js `global` object so it survives reloads.
 */

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global type so TypeScript knows about our cache.
declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongoose ?? {
  conn: null,
  promise: null,
};

if (!global._mongoose) {
  global._mongoose = cached;
}

/**
 * Connect to MongoDB (or return the existing connection).
 * Throws a friendly error if the connection string is missing.
 */
export async function connectToDatabase(): Promise<Mongoose> {
  if (!MONGODB_URI) {
    throw new Error(
      "We couldn't find your database connection string. Please add MONGODB_URI to your .env.local file."
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: "sbi-saathi",
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset the promise so the next request can retry the connection.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
