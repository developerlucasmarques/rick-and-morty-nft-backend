import {} from "dotenv/config";
import express from "express";
import cors from "cors";
import {connectDatabase} from "./database/database.js";

const port = process.env.PORT || 3001;
const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})