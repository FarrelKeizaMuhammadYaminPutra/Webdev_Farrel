import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js"; // Sequelize connection setup
import authRoutes from "./routes/auth.route.js"; // Auth routes
import countryRoutes from "./routes/countries.route.js"; // Country routes (new)
import genreRoutes from "./routes/genres.route.js";

dotenv.config( {path: '../.env' });


const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS
app.use(express.json()); // Parse incoming requests:req.body
app.use(cookieParser()); // Parse incoming cookies

// Routes
app.use("/api/auth", authRoutes); // Existing auth routes
app.use("/api", countryRoutes); // Country routes (new)
app.use("/api", genreRoutes); // Genre routes (new)

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Start the server and connect to the database
app.listen(PORT, async () => {
    try {
        await connectDB(); // Connect to MySQL via Sequelize
        console.log(`Server is running on port: ${PORT}`);
    } catch (error) {
        console.log("Error connecting to the database: ", error);
    }
});

