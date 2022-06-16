import { parse } from "../deps.ts";
import { cleanDb, setUpDb } from "./index.ts";

const main = async () => {
  const args = parse(Deno.args);
  if (!args.down && !args.up) {
    console.error("Only Arguments down or up are accepted.");
    Deno.exit();
  }

  if (args.down) {
    await cleanDb();
    Deno.exit();
  }

  if (args.up) {
    await setUpDb();
    Deno.exit();
  }
};

(async () => {
  await main();
})();
