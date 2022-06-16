import { Context, Injectable, Status } from "../../deps.ts";
import AuthenticationService from "./auth.service.ts";
import { formatError } from "../../middlewares/error.ts";

@Injectable()
export default class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  loginHandler(ctx: Context) {
    ctx.response.body = this.authService.getAuthUri();
    ctx.response.status = Status.Found;
  }

  async getGoogleCallBackHandler(ctx: Context) {
    try {
      const response = await this.authService.getGoogleCallBack(
        ctx.request.url,
      );
      if (response) {
        await ctx.cookies.set("user", JSON.stringify(response), {
          sameSite: "none",
          httpOnly: false,
          maxAge: 3600,
        });
        ctx.response.redirect("http://localhost:3000/");
      }
    } catch (error) {
      const { status, message } = formatError(error);

      if (
        message.trim().toLowerCase() === "User does not exist".toLowerCase() ||
        message.trim().toLowerCase() === "Google auth user not found"
      ) {
        ctx.response.redirect("http://localhost:3000/");
        return;
      }
      ctx.throw(status, message);
    }
  }
}
