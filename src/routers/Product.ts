import { Router } from "express";
import * as Controller from "../controllers/index.js";
import * as Middleware from "../middleware/index.js";

const router = Router();

router.get("/", Middleware.authMiddleware, Controller.ProductController.getProducts);

router.get("/:id", Controller.ProductController.getProduct);

router.post("/:productId/reviews", Middleware.authMiddleware, Controller.ReviewController.postReview);

router.get("/:productId/reviews", Controller.ReviewController.getReviewsByProductId);

export { router as ProductRouter }; 