import { Context, helpers, Injectable, Status } from "../../deps.ts";
import UserService from "./user.service.ts";
import { User, UserSignInBody } from "./user.types.ts";
import { extractBodyRequest, validateParamId } from "../../utils/helpers.ts";
import { formatError } from "../../middlewares/error.ts";
import { validateUserSchema } from "./user.validators.ts";

@Injectable()
export default class UserController {
  constructor(private readonly userService: UserService) {}

  async signUpHandler(ctx: Context) {
    try {
      const { request } = ctx;
      if (!request.hasBody) {
        ctx.throw(Status.BadRequest, "Body request is required");
      }
      const body = request.body();
      const userBody = await extractBodyRequest<User>(body);
      if (userBody) {
        const validatedUserBody = validateUserSchema(userBody);
        const { user, token } = await this.userService.signup(
          validatedUserBody,
        );
        ctx.response.status = Status.OK;
        ctx.response.body = { user, token };
        ctx.response.type = "json";
        return;
      }
      ctx.throw(Status.BadRequest, "Invalid body request value");
    } catch (error) {
      const { status, message } = formatError(error);
      ctx.throw(status, message);
    }
  }

  async signInHandler(ctx: Context) {
    try {
      const { request } = ctx;
      const body = request.body();
      if (!request.hasBody || !body) {
        ctx.throw(Status.BadRequest, "Body request is required");
      }
      const userBody = await extractBodyRequest<UserSignInBody>(body);
      if (userBody) {
        const { user, token } = await this.userService.signin(userBody);
        ctx.response.status = Status.OK;
        ctx.response.body = { user, token };
        ctx.response.type = "json";
        return;
      }
      ctx.throw(Status.BadRequest, "Invalid body request value");
    } catch (error) {
      const { status, message } = formatError(error);
      ctx.throw(status, message);
    }
  }

  async fetchUserHandler(ctx: Context) {
    try {
      const { userId } = helpers.getQuery(ctx, { mergeParams: true });
      const id = validateParamId(Number(userId));
      if (id) {
        const fetchedUser = await this.userService.getUser({
          id,
        });
        ctx.response.status = Status.OK;
        ctx.response.body = { user: fetchedUser };
        ctx.response.type = "json";
        return;
      }
      ctx.throw(Status.BadRequest, "Invalid query params request value");
    } catch (error) {
      const { status, message } = formatError(error);
      ctx.throw(status, message);
    }
  }

  async deleteUserHandler(ctx: Context) {
    try {
      const { userId } = helpers.getQuery(ctx, { mergeParams: true });
      const id = validateParamId(Number(userId));
      if (id) {
        const { deletedUser } = await this.userService.deleteUser(id);
        ctx.response.status = Status.OK;
        ctx.response.body = deletedUser;
        ctx.response.type = "json";
        return;
      }
      ctx.throw(Status.BadRequest, "Invalid query params request value");
    } catch (error) {
      const { status, message } = formatError(error);
      ctx.throw(status, message);
    }
  }
}
