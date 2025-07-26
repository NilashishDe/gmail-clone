import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Route imports
import userRoute from "./routes/user.route.js";
import emailRoute from "./routes/email.route.js";
import draftRoute from "./routes/draft.route.js"; // <-- Make sure this is imported

dotenv.config({});
connectDB();
const PORT = 8080;
const app = express();

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/email", emailRoute);
app.use("/api/v1/draft", draftRoute); // <-- Make sure this line is added

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
});
