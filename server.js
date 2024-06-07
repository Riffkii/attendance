import "express-async-errors";
import { config } from "dotenv";
import express from "express";
import { checkIn, checkOut } from "./src/service/attendanceService.js";
import { getPresences } from "./src/service/presenceService.js";
import cors from "cors";
import { corsOptions } from "./src/config/cors.js";
import { getEmployees } from "./src/service/employeeService.js";
import multer from "multer";

config();

const upload = multer({ dest: "uploads/" });

const app = express();
const PORT = process.env.PORT;

app.use(cors(corsOptions));

app.get("/employees", getEmployees);
app.get("/presences", getPresences);
app.post("/presences/check-in", upload.single("file"), checkIn);
app.patch("/presences/check-out", checkOut);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
