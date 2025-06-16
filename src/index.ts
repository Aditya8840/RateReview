import express from "express";
import dotenv from "dotenv";
import authRouter from "./routers/Auth";
import { errorHandler } from "./middleware/ErrorHandler";

dotenv.config();

const app = express();

app.use(express.json());

app.use(errorHandler);
app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
