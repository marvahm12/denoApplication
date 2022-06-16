import app from "./app.ts";
import { bold, cyan, green } from "./deps.ts";

const port = Number(Deno.env.get("PORT")) || 5000;
const hostname = Deno.env.get("HOSTNAME") || "127.0.0.1";
const protocol = Deno.env.get("PROTOCOL") || "http";
const url = `${protocol}://${hostname}:${port}`;

app.addEventListener("listen", () => {
  console.log(
    bold(green("Server listening on ")) + bold(cyan(`${url}`)),
  );
});

await app.listen({ port });
