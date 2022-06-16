import UserModel from "./user.model.ts";

export interface User {
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  phoneNumber: string;
  email: string;
  birthday: Date;
  [key: string]: string | Date | number;
}

export interface UserFetch {
  id?: number;
  email?: string;
  username?: string;
  [key: string]: string | number | undefined;
}

export type UserBody = User;

export type UserSignInBody = Pick<User, "username" | "password">;
export interface UserApiResponse {
  user: User;
  token: string;
}
