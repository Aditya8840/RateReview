import express from "express";
import dotenv from "dotenv";
import path from "path";
import * as Routers from "./routers/index.js";
import * as Middleware from "./middleware/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'public')));

app.use("/api/auth", Routers.AuthRouter);
app.use("/api/user", Routers.UserRouter);
app.use("/api/products", Routers.ProductRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.use(Middleware.errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
