import { Schema, string, unknown } from "../../deps.ts";
import { User } from "./user.types.ts";
import { validate } from "../../utils/helpers.ts";

const phoneNumberRegex =
  /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,8}$/;
const usernameRegex = /^[a-z0-9]{3,10}$/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const UserSchema = Schema({
  username: string.trim().regexp(
    usernameRegex,
    `does not match ${usernameRegex}`,
  ),
  firstName: string.trim().normalize().between(
    2,
    40,
    "should contain at least two characters.",
  ),
  lastName: string.trim().normalize().between(
    2,
    40,
    "should contain at least two characters.",
  ),
  password: string.trim().regexp(
    passwordRegex,
    `should contain at least one upper case,
    at least one lower case,
    at least one digit,
    at least least one special character,
    and should have minimum eight in length.`,
  ),
  email: string.trim().regexp(emailRegex, `Invalid email format`),
  phoneNumber: string.trim().regexp(
    phoneNumberRegex,
    `does not match ${phoneNumberRegex}`,
  ),
  birthday: unknown.date("should be a date"),
}, { strict: true });

const UserUpdateSchema = Schema({
  username: string.trim().regexp(
    usernameRegex,
    `does not match ${usernameRegex}`,
  ).optional(),
  firstName: string.trim().normalize().between(
    2,
    40,
    "should contain at least two characters.",
  ).optional(),
  lastName: string.trim().normalize().between(
    2,
    40,
    "should contain at least two characters.",
  ).optional(),
  password: string.trim().regexp(
    passwordRegex,
    `should contain at least one upper case,
    at least one lower case,
    at least one digit,
    at least least one special character,
    and should have minimum eight in length.`,
  ).optional(),
  email: string.trim().regexp(emailRegex, `Invalid email format`).optional(),
  phoneNumber: string.trim().regexp(
    phoneNumberRegex,
    `does not match ${phoneNumberRegex}`,
  ).optional(),
  birthday: unknown.date("Birthday should be a date").optional(),
}, { strict: true });

export const validateUserSchema = (input: User) =>
  validate(UserSchema.destruct(), input);
