import "dotenv/config";
import dns from "node:dns";
import { MongoClient } from "mongodb";

if (process.env.NODE_ENV !== "production") {
  dns.setServers(["1.1.1.1", "1.0.0.1"]);
}

let _db;

const initDb = async () => {
  if (_db) {
    console.log("Database is already initialized!");
    return _db;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  _db = client.db();
  console.log("Connected to MongoDB");
  return _db;
};

const getDb = () => {
  if (!_db) {
    throw new Error("Database not initialized");
  }
  return _db;
};

export { initDb, getDb };
