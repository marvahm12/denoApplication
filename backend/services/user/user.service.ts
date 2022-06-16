import { bcrypt, Injectable, Status, Values } from "../../deps.ts";
import {
  User,
  UserApiResponse,
  UserFetch,
  UserSignInBody,
} from "./user.types.ts";
import UserModel from "./user.model.ts";
import { CustomErrorHandler } from "../../middlewares/error.ts";
import { formatError } from "../../middlewares/error.ts";
import { generateJwtToken } from "../../utils/helpers.ts";

@Injectable()
export default class UserService {
  private salt: string;
  constructor() {
    this.salt = bcrypt.genSaltSync(12);
  }

  async signin(user: UserSignInBody): Promise<UserApiResponse> {
    const { username, password } = user;

    const existentUser = <UserModel> await UserModel.where("username", username)
      .first();

    if (!existentUser) {
      throw new CustomErrorHandler(Status.NotFound, "User does not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      <string> existentUser.password,
    );
    if (!isPasswordCorrect) {
      throw new CustomErrorHandler(Status.BadRequest, "Password wrong.");
    }

    const token = await generateJwtToken(<string> existentUser.username);
    return { user: this.formatUserResponse(existentUser), token };
  }

  async signup(user: User): Promise<UserApiResponse> {
    try {
      const existentUser = await UserModel.where({ username: user.username })
        .first();
      const existentEmail = await UserModel.where("email", user.email).first();

      if (existentUser || existentEmail) {
        throw new CustomErrorHandler(Status.BadRequest, "User already exists");
      }
      const hashedPassword = await bcrypt.hash(
        <string> user.password,
        this.salt,
      );
      user.password = hashedPassword;

      const createdUser = <UserModel> await UserModel.create(user);
      const token = await generateJwtToken(<string> createdUser.username);
      return { user: this.formatUserResponse(createdUser), token };
    } catch (error) {
      const { status, message } = formatError(error);
      throw new CustomErrorHandler(status, message);
    }
  }
  async getUser(
    user: UserFetch,
  ): Promise<User> {
    const fetchedUser = <UserModel> await UserModel.where(<Values> user)
      .first();

    if (!fetchedUser) {
      throw new CustomErrorHandler(Status.NotFound, "User does not exist");
    }
    return this.formatUserResponse(fetchedUser);
  }
  async deleteUser(userId: number) {
    try {
      // check user existence
      await this.getUser({ id: userId });

      // delete the user
      await UserModel.deleteById(`${userId}`);

      const fetchedUser = await UserModel.where({ id: userId }).first();
      if (!fetchedUser) return { deletedUser: userId };

      throw new CustomErrorHandler(
        Status.BadRequest,
        "Error while deleting user",
      );
    } catch (error) {
      const { status, message } = formatError(error);
      throw new CustomErrorHandler(status, message);
    }
  }

  formatUserResponse(user: UserModel): User {
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      birthday: user.birthday,
      phoneNumber: user.phoneNumber,
    };
  }
}
