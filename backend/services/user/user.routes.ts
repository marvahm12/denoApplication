import { Bootstrapped, Context, Router } from "../../deps.ts";
import UserController from "./user.controller.ts";

@Bootstrapped()
export default class UserRouter {
  constructor(private readonly userController: UserController) {}

  getRouter() {
    const userRouter = new Router();
    userRouter.post(
      "/signup",
      (ctx: Context) => this.userController.signUpHandler(ctx),
    );
    userRouter.post(
      "/signin",
      (ctx: Context) => this.userController.signInHandler(ctx),
    );
    userRouter.get(
      "/users/:userId",
      (ctx: Context) => this.userController.fetchUserHandler(ctx),
    );
    userRouter.delete(
      "/users/:userId",
      (ctx: Context) => this.userController.deleteUserHandler(ctx),
    );
    return userRouter;
  }
}
