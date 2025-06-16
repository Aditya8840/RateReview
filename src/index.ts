import express from "express";
import dotenv from "dotenv";
import * as Routers from "./routers/index.js";
import * as Middleware from "./middleware/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Middleware.errorHandler);

app.use("/api/auth", Routers.AuthRouter);
app.use("/api/user", Routers.UserRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
