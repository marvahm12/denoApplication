import { cleanDb, closeDb, setUpDb } from "../../database/index.ts";
import { expect, superoak } from "../../deps.ts";
import { createProducts } from "../../seeds/index.ts";
import { generateJwtToken } from "../../utils/helpers.ts";
import app from "../../app.ts";

Deno.env.set("ENVIRONMENT", "test");

Deno.test("[Product]", async (t) => {
  // initialize db
  await cleanDb();
  await setUpDb();

  const token = await generateJwtToken("johnny123");
  await t.step(
    "[Create]: Returns an error if the brand is missing",
    async () => {
      const request = await superoak(app);
      await request.post("/products/add")
        .set("x-access-token", token)
        .send({})
        .expect(400)
        .expect(/brand: Expect value to be "string"/i);
    },
  );

  await t.step(
    "[Create]: Returns an error if the brand does not match the pattern",
    async () => {
      const request = await superoak(app);
      await request.post("/products/add")
        .set("x-access-token", token)
        .send({ name: "prod 1", brand: "b" })
        .expect(400)
        .expect(/brand: should contain at least four characters./i);
    },
  );

  await t.step(
    "[Create]: Returns an error if the name is missing",
    async () => {
      const request = await superoak(app);
      await request.post("/products/add")
        .set("x-access-token", token)
        .send({ brand: "product 1 brand" })
        .expect(400)
        .expect(/name: Expect value to be "string"/i);
    },
  );

  await t.step(
    "[Create]: Returns an error if the name does not match the pattern",
    async () => {
      const request = await superoak(app);
      await request.post("/products/add")
        .set("x-access-token", token)
        .send({ brand: "product 1 brand", name: "p" })
        .expect(400)
        .expect(/name: should contain at least 10 characters./i);
    },
  );

  await t.step(
    "[Create]: Returns an error if the quantity is missing",
    async () => {
      const request = await superoak(app);
      await request.post("/products/add")
        .set("x-access-token", token)
        .send({ name: "This a product name", brand: "product 1 brand" })
        .expect(400)
        .expect(/quantity: Expect value to be "number"/i);
    },
  );

  await t.step(
    "[Create]: Returns an error if the quantity does not match the pattern",
    async () => {
      const request = await superoak(app);
      await request.post("/products/add")
        .set("x-access-token", token)
        .send({
          name: "This is a product name",
          brand: "product 1 brand",
          quantity: 0,
        })
        .expect(400)
        .expect(/quantity: should be greater than zero./i);
    },
  );

  await t.step(
    "[Create]: Returns an error if the price is missing",
    async () => {
      const request = await superoak(app);
      await request.post("/products/add")
        .set("x-access-token", token)
        .send({
          name: "This is a product name",
          brand: "product 1 brand",
          quantity: 1,
        })
        .expect(400)
        .expect(/price: Expect value to be "number"/i);
    },
  );

  await t.step(
    "[Create]: Returns an error if the price does not match the pattern",
    async () => {
      const request = await superoak(app);
      await request.post("/products/add")
        .set("x-access-token", token)
        .send({
          name: "This is a product name",
          brand: "product 1 brand",
          quantity: 1,
          price: 0,
        })
        .expect(400)
        .expect(/price: should be greater than zero./i);
    },
  );

  await t.step(
    "[Create]: Returns an error if the provider is missing",
    async () => {
      const request = await superoak(app);
      await request.post("/products/add")
        .set("x-access-token", token)
        .send({
          name: "This is a product name",
          brand: "product 1 brand",
          quantity: 1,
          price: 10,
        })
        .expect(400)
        .expect(/provider: Expect value to be "string"/i);
    },
  );

  await t.step(
    "[Create]: Returns an error if the provider does not match the pattern",
    async () => {
      const request = await superoak(app);
      await request.post("/products/add")
        .set("x-access-token", token)
        .send({
          name: "This is a product name",
          brand: "product 1 brand",
          quantity: 1,
          price: 10,
          provider: "",
        })
        .expect(400)
        .expect(/provider: should contain at least four characters./i);
    },
  );

  await t.step(
    "[Create]: Returns an error if the imageUrl is missing",
    async () => {
      const request = await superoak(app);
      await request.post("/products/add")
        .set("x-access-token", token)
        .send({
          name: "This is a product name",
          brand: "product 1 brand",
          quantity: 1,
          price: 10,
          provider: "provider 1",
        })
        .expect(400)
        .expect(/imageUrl: Expect value to be "string"/i);
    },
  );

  await t.step(
    "[Create]: Returns successfully the created product",
    async () => {
      const productToCreate = {
        name: "This is a product name",
        brand: "product 1 brand",
        quantity: 1,
        price: 10,
        provider: "provider 1",
        imageUrl: "",
      };
      const request = await superoak(app);

      let done: () => void;
      const donePromise = new Promise<void>((resolve) => done = resolve);

      request.post("/products/add")
        .set("x-access-token", token)
        .send(productToCreate)
        .expect(200)
        .end((err, response) => {
          if (err) {
            throw err;
          }
          const { body: { product } } = response;

          expect(product).toHaveProperty("name");
          expect(product.name).toEqual(productToCreate.name);
          expect(product).toHaveProperty("brand");
          expect(product.brand).toEqual(productToCreate.brand);
          expect(product).toHaveProperty("price");
          expect(product.price).toEqual(`${productToCreate.price}`);

          expect(product).toHaveProperty("provider");
          expect(product.provider).toEqual(productToCreate.provider);

          expect(product).toHaveProperty("imageUrl");
          expect(product.imageUrl).toEqual(productToCreate.imageUrl);

          expect(product).toHaveProperty("quantity");
          expect(product.quantity).toEqual(productToCreate.quantity);

          done();
        });
      await donePromise;
    },
  );

  await t.step(
    "[Create]: Returns an error if the product name already exists",
    async () => {
      await createProducts();
      const productToCreate = {
        name: "Jeans Skinny Fit- Blue Denim",
        brand: "product 1 brand",
        quantity: 1,
        price: 10,
        provider: "provider 1",
        imageUrl: "",
      };
      const request = await superoak(app);

      await request.post("/products/add")
        .set("x-access-token", token)
        .send(productToCreate)
        .expect(400)
        .expect(/Product already exists/i);
    },
  );

  await t.step(
    "[Search]: Returns an empty list of products",
    async () => {
      const request = await superoak(app);

      let done: () => void;
      const donePromise = new Promise<void>((resolve) => done = resolve);

      request.get("/products/search?name=p123")
        .set("x-access-token", token)
        .expect(200)
        .end((err, response) => {
          if (err) {
            throw err;
          }
          const { body: { limit, offset, products, total } } = response;

          expect(products).toHaveLength(0);
          expect(total).toEqual(0);
          expect(limit).toEqual(10);
          expect(offset).toEqual(0);

          done();
        });
      await donePromise;
    },
  );

  await t.step(
    "[Search]: Returns the list of fetched products",
    async () => {
      const request = await superoak(app);

      let done: () => void;
      const donePromise = new Promise<void>((resolve) => done = resolve);

      request.get("/products/search?name=Jeans Skinny Fit- Blue Denim")
        .set("x-access-token", token)
        .expect(200)
        .end((err, response) => {
          if (err) {
            throw err;
          }
          const { body: { offset, limit, products, total } } = response;

          expect(products).toHaveLength(1);
          expect(total).toEqual(1);
          expect(limit).toEqual(10);
          expect(offset).toEqual(0);

          done();
        });
      await donePromise;
    },
  );

  await t.step(
    "[GET Reviews]: Returns the list of product reviews",
    async () => {
      const request = await superoak(app);

      let done: () => void;
      const donePromise = new Promise<void>((resolve) => done = resolve);

      request.get("/products/1/reviews")
        .set("x-access-token", token)
        .expect(200)
        .end((err, response) => {
          if (err) {
            throw err;
          }
          const { body: { productReviews, total } } = response;

          expect(productReviews).toHaveLength(0);
          expect(total).toEqual(0);

          done();
        });
      await donePromise;
    },
  );

  await t.step("[Update]: Updates successfully the product", async () => {
    const update = {
      provider: "provider 1",
    };
    const request = await superoak(app);

    let done: () => void;
    const donePromise = new Promise<void>((resolve) => done = resolve);

    request.patch("/products/1")
      .set("x-access-token", token)
      .send(update)
      .expect(200)
      .end((err, response) => {
        if (err) {
          throw err;
        }
        const { body: { product } } = response;

        expect(product).toHaveProperty("provider");
        expect(product.provider).toEqual(update.provider);

        done();
      });
    await donePromise;
  });

  await t.step(
    "[Update]: Returns an error if the product does not exist",
    async () => {
      const update = {
        provider: "provider 1",
      };
      const request = await superoak(app);

      await request.patch("/products/1000")
        .set("x-access-token", token)
        .send(update)
        .expect(404)
        .expect(/Product does not exist/i);
    },
  );

  await t.step(
    "[Delete]: Returns an error if the product does not exist while removing it.",
    async () => {
      const request = await superoak(app);

      await request.delete("/products/1000")
        .set("x-access-token", token)
        .expect(404)
        .expect(/Product does not exist/i);
    },
  );

  await t.step(
    "[Delete]: Delete successfully the product",
    async () => {
      const request = await superoak(app);
      let done: () => void;
      const donePromise = new Promise<void>((resolve) => done = resolve);

      request.delete("/products/1")
        .set("x-access-token", token)
        .end((err, response) => {
          if (err) {
            throw err;
          }
          const { body: { deletedElements, productId } } = response;

          expect(deletedElements).toEqual(1);
          expect(productId).toEqual(1);

          done();
        });
      await donePromise;
    },
  );

  await closeDb();
});
