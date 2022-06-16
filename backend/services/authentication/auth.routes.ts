import { Bootstrapped, Context, Router } from "../../deps.ts";
import AuthenticationController from "./auth.controller.ts";

@Bootstrapped()
export default class AuthenticationRouter {
  constructor(private readonly authController: AuthenticationController) {}

  getRouter() {
    const authRouter = new Router();
    authRouter.get(
      "/google/url",
      (ctx: Context) => this.authController.loginHandler(ctx),
    );
    authRouter.get(
      "/google/callback",
      (ctx: Context) => this.authController.getGoogleCallBackHandler(ctx),
    );

    return authRouter;
  }
}
