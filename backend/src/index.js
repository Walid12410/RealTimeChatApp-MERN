import express from "express";
import authRoute from "./routes/auth.route.js";
import { connectToDB } from "./lib/db.js";
import dotenv from "dotenv";
import cookieParse from "cookie-parser";
import messageRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParse());

app.use("/api/auth",authRoute);
app.use("/api/message",messageRoute);


app.listen(5001, () => {
    console.log("Server is running on port 5001");
    connectToDB();
});
