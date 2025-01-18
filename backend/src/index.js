import express from "express";
import authRoute from "./routes/auth.route.js";
import { connectToDB } from "./lib/db.js";
import dotenv from "dotenv";
import cookieParse from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import {app , server } from "./lib/socket.js";


dotenv.config();

app.use(express.json());
app.use(cookieParse());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);


server.listen(5001, () => {
    console.log("Server is running on port 5001");
    connectToDB();
});
