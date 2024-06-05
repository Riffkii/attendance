import "express-async-errors";
import { config } from "dotenv";
import express from "express";

config();

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
