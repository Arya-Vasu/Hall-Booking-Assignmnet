import express from "express";
import { MongoClient } from "mongodb";
import { roomsRouter } from "./Routes/rooms.js";
// import {roomsRouter} from "./routes/rooms";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// const PORT = 4500;
const PORT = process.env.PORT || 4500;

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

export const client = await createConnection();

app.use(express.json());

// Started the app -

app.get("/", async function (req, res) {
  res.send("Hello All Welcome to Hall Booking App!!!");
});

app.use("/", roomsRouter);

app.listen(PORT, () => console.log(`Code started in ${PORT}`));
