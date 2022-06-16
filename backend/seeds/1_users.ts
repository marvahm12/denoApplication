import UserModel from "../services/user/user.model.ts";
import { hashPassword, printSuccessMessage } from "../utils/helpers.ts";

export const createUsers = async () => {
  const password = await hashPassword("jS123456789@");
  await UserModel.create([{
    firstName: "John",
    lastName: "Smith",
    password,
    username: "john1",
    phoneNumber: "00490152859642",
    email: "john.smith@gmail.com",
    birthday: "01/01/1980",
  }]);
  return printSuccessMessage("Users list created successfully.");
};
