import { Router } from "../deps.ts";
import {
  authRouter,
  productRouter,
  reviewRouter,
  userRouter,
} from "../di/index.ts";
import { verifyToken } from "../middlewares/auth.ts";

const appRoutes = new Router();

const authenticationRoutes = authRouter.getRouter();
const userRoutes = userRouter.getRouter();
const productRoutes = productRouter.getRouter();
const reviewRoutes = reviewRouter.getRouter();

appRoutes.use(
  "/auth",
  authenticationRoutes.routes(),
  authenticationRoutes.allowedMethods(),
);
appRoutes.use(userRoutes.routes(), userRoutes.allowedMethods());
appRoutes.use(
  "/products",
  verifyToken,
  productRoutes.routes(),
  productRoutes.allowedMethods(),
);
appRoutes.use(
  "/reviews",
  verifyToken,
  reviewRoutes.routes(),
  reviewRoutes.allowedMethods(),
);

export default appRoutes;
