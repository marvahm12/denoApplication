import { cleanDb, setUpDb } from "./index.ts";
import { createProducts, createReviews, createUsers } from "../seeds/index.ts";

const main = async () => {
  // clean db
  await cleanDb();

  // initialize db
  await setUpDb();

  // fill tables with data
  await createUsers();
  await createProducts();
  await createReviews();
  Deno.exit();
};

(async () => {
  try {
    await main();
  } catch (error) {
    throw error;
  }
})();
