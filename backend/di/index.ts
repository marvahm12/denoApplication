import { bootstrap } from "../deps.ts";
import AuthenticationRouter from "../services/authentication/auth.routes.ts";
import UserRouter from "../services/user/user.routes.ts";
import ProductRouter from "../services/product/product.routes.ts";
import ReviewRouter from "../services/review/review.routes.ts";

export const authRouter = bootstrap(AuthenticationRouter);
export const userRouter = bootstrap(UserRouter);
export const productRouter = bootstrap(ProductRouter);
export const reviewRouter = bootstrap(ReviewRouter);
