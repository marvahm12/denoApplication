import { Context, Status, verify } from "../deps.ts";

export const jwtKey = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
export const verifyToken = async (context: Context, next: () => void) => {
  try {
    const token = context.request.headers.get("x-access-token") || "";
    if (!token) {
      context.response.status = Status.Unauthorized;
      context.response.body = { message: "No provided Token" };
      context.response.type = "json";
      return;
    }

    const payload = await verify(token, jwtKey);
    if (payload && payload.username) {
      await next();
      return;
    }
  } catch (error) {
    if (error.message.includes("jwt")) {
      context.response.status = Status.Unauthorized;
      context.response.body = { message: "Invalid provided token." };
      context.response.type = "json";
      return;
    }
    throw error;
  }
};
