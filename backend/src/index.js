import express from "express";//ES module
// const express = require("express");//common js
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import apiRoutes from "./routes/apiRoutes.js";
import {connectDB} from "./config/db.js"; // Importing the database connection function

// import

dotenv.config(); // Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


 // Importing the API routes
// console.log(process.env.MONGO_URI);
const app = express();
const PORT=process.env.PORT||5001; // Default to 5001 if PORT is not set in .env


app.set('view engine','ejs');
// app.set('routes', path.join(__dirname, '.', 'routes'));
app.set('controllers', path.join(__dirname, '.', 'controllers')); 


app.use(express.json()); // Middleware to parse JSON request bodies here in this case will get acces to request.body
 // Using the rate limiter 

app.use(cors({
  origin:"http://localhost:5173",// Allow requests from the frontend
}))
//our simple custom middleware
// app.use((req, res, next) => {
//  console.log("We just got a new request");
//  console.log(`Request Method: ${req.method} & Request URL is ${req.url}`);
//  next();
// });


app.use("/api", apiRoutes); // Using the API routes
//we can add more api routes here if needed
connectDB();

connectDB().then(() => {
 app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
  console.log("Visit http://localhost:" + PORT + " to access the API");
});
});

// mongodb+srv://arpithpoojary956:F3v1fuvSVnedugz8@cluster0.7u6ixxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
