import { cleanDb, setUpDb } from "../../database/index.ts";
import { expect, superoak } from "../../deps.ts";
import { createProducts, createUsers } from "../../seeds/index.ts";
import { generateJwtToken } from "../../utils/helpers.ts";
import app from "../../app.ts";

Deno.env.set("ENVIRONMENT", "test");

Deno.test("[Reviews]", async (t) => {
  // initialize db
  await cleanDb();
  await setUpDb();
  await createUsers();
  await createProducts();

  const token = await generateJwtToken("johnny123");
  await t.step(
    "[CREATE]: Returns an error if the score is missing",
    async () => {
      const request = await superoak(app);
      await request.post("/reviews/add")
        .set("x-access-token", token)
        .send({})
        .expect(400)
        .expect(/score: Expect value to be "number"/i);
    },
  );

  await t.step(
    "[CREATE]: Returns an error if the score is less than 0",
    async () => {
      const request = await superoak(app);
      await request.post("/reviews/add")
        .set("x-access-token", token)
        .send({ score: -1 })
        .expect(400)
        .expect(/score: Expect value to be greater or equal than 0/i);
    },
  );

  await t.step(
    "[CREATE]: Returns an error if the score is greater than 5",
    async () => {
      const request = await superoak(app);
      await request.post("/reviews/add")
        .set("x-access-token", token)
        .send({ score: 6 })
        .expect(400)
        .expect(/score: Expect value to be lower or equal than 5/i);
    },
  );

  await t.step(
    "[CREATE]: Returns an error if the message is missing",
    async () => {
      const request = await superoak(app);
      await request.post("/reviews/add")
        .set("x-access-token", token)
        .send({ score: 3 })
        .expect(400)
        .expect(/message: Expect value to be "string"/i);
    },
  );

  await t.step(
    "[CREATE]: Returns an error if the message does not match the pattern",
    async () => {
      const request = await superoak(app);
      await request.post("/reviews/add")
        .set("x-access-token", token)
        .send({ score: 3, message: "" })
        .expect(400)
        .expect(/message: should contain at least 10 characters./i);
    },
  );

  await t.step(
    "[CREATE]: Returns an error if the productId is missing",
    async () => {
      const request = await superoak(app);
      await request.post("/reviews/add")
        .set("x-access-token", token)
        .send({ score: 3, message: "this is a review for product 1" })
        .expect(400)
        .expect(/productId: Expect value to be "number"/i);
    },
  );

  await t.step(
    "[CREATE]: Returns an error if the userId is missing",
    async () => {
      const request = await superoak(app);
      await request.post("/reviews/add")
        .set("x-access-token", token)
        .send({
          score: 3,
          message: "this is a review for product 1",
          productId: 1,
        })
        .expect(400)
        .expect(/userId: Expect value to be "number"/i);
    },
  );

  await t.step(
    "[CREATE]: Returns an error if the productId does not exist",
    async () => {
      const request = await superoak(app);

      await request.post("/reviews/add")
        .set("x-access-token", token)
        .send({
          score: 3,
          message: "this is a review for product 1",
          productId: 1000,
          userId: 1,
        })
        .expect(404)
        .expect(/Product does not exist/i);
    },
  );

  await t.step(
    "[CREATE]: Returns an error if the userId does not exist",
    async () => {
      const request = await superoak(app);

      await request.post("/reviews/add")
        .set("x-access-token", token)
        .send({
          score: 3,
          message: "this is a review for product 1",
          productId: 1,
          userId: 1000,
        })
        .expect(404)
        .expect(/User does not exist/i);
    },
  );

  await t.step(
    "[CREATE]: Returns the created review successfully",
    async () => {
      const request = await superoak(app);
      const review = {
        score: 3,
        message: "this is a review for product 1",
        productId: 1,
        userId: 1,
      };
      let done: () => void;
      const donePromise = new Promise<void>((resolve) => done = resolve);

      request.post("/reviews/add")
        .set("x-access-token", token)
        .send(review)
        .expect(200)
        .end((err, response) => {
          if (err) {
            throw err;
          }
          const { body: review } = response;

          expect(review).toHaveProperty("score");
          expect(review.score).toEqual(review.score);
          expect(review).toHaveProperty("message");
          expect(review.message).toEqual(review.message);
          expect(review).toHaveProperty("user");
          expect(review.user).toEqual(review.user);
          expect(review).toHaveProperty("productId");
          expect(review.productId).toEqual(review.productId);

          done();
        });
      await donePromise;
    },
  );

  await t.step(
    "[Update]: Returns the updated review successfully",
    async () => {
      const update = { score: 4 };
      const request = await superoak(app);
      let done: () => void;
      const donePromise = new Promise<void>((resolve) => done = resolve);

      request.patch("/reviews/update/1/user/1")
        .set("x-access-token", token)
        .send(update)
        .expect(200)
        .end((err, response) => {
          if (err) {
            throw err;
          }
          const { body: review } = response;

          expect(review).toHaveProperty("score");
          expect(review.score).toEqual(update.score);

          done();
        });
      await donePromise;
    },
  );

  await t.step(
    "[Update]: Returns an error if the product does not exist",
    async () => {
      const update = { score: 4 };
      const request = await superoak(app);

      await request.patch("/reviews/update/1000/user/1")
        .set("x-access-token", token)
        .send(update)
        .expect(404)
        .expect(/Product does not exist/i);
    },
  );
});
