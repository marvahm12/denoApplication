import { cleanDb, setUpDb } from "../../database/index.ts";
import { createUsers } from "../../seeds/index.ts";
import { expect, superoak } from "../../deps.ts";
import app from "../../app.ts";

Deno.env.set("ENVIRONMENT", "test");

Deno.test("SignIn", async (t) => {
  // initialize db
  await cleanDb();
  await setUpDb();
  await createUsers();

  await t.step("Returns an error if the user does not exist", async () => {
    const request = await superoak(app);
    await request.post("/signin")
      .send({ username: "user1", password: "123456" })
      .expect(404)
      .expect(/User does not exist/i);
  });

  await t.step({
    name: "Returns an error if the password is wrong",
    fn: async () => {
      const request = await superoak(app);
      await request.post("/signin")
        .send({ username: "john1", password: "123456" })
        .expect(400)
        .expect(/password wrong/i);
    },
  });

  await t.step({
    name: "Returns the user successfully",
    fn: async () => {
      const request = await superoak(app);
      await request.post("/signin")
        .send({ username: "john1", password: "jS123456789@" })
        .expect(200);
    },
  });
  await t.step("Returns an error if the username is missing", async () => {
    const request = await superoak(app);
    await request.post("/signup")
      .send({ password: "123456" })
      .expect(400)
      .expect(/username: Expect value to be "string"/i);
  });

  await t.step(
    "Returns an error if the username does not match the format",
    async () => {
      const request = await superoak(app);
      await request.post("/signup")
        .send({ username: "" })
        .expect("username: does not match /^[a-z0-9]{3,10}$/");
    },
  );

  await t.step("Returns an error if the firstName is missing", async () => {
    const request = await superoak(app);
    await request.post("/signup")
      .send({ username: "user1" })
      .expect(400)
      .expect(/firstname: Expect value to be "string"/i);
  });

  await t.step(
    "Returns an error if the firstName does not match the format",
    async () => {
      const request = await superoak(app);
      await request.post("/signup")
        .send({ username: "user1", firstName: "" })
        .expect(400)
        .expect(/firstname: should contain at least two characters/i);
    },
  );

  await t.step("Returns an error if the lastName is missing", async () => {
    const request = await superoak(app);
    await request.post("/signup")
      .send({ username: "john1", firstName: "John" })
      .expect(400)
      .expect(/lastname: Expect value to be "string"/i);
  });

  await t.step(
    "Returns an error if the lastName does not match the format",
    async () => {
      const request = await superoak(app);
      await request.post("/signup")
        .send({ username: "user1", firstName: "John", lastName: "" })
        .expect(400)
        .expect(/lastname: should contain at least two characters/i);
    },
  );

  await t.step("Returns an error if the password is missing", async () => {
    const request = await superoak(app);
    await request.post("/signup")
      .send({ username: "john1", firstName: "John", lastName: "Smith" })
      .expect(400)
      .expect(/password: Expect value to be "string"/i);
  });

  // await t.step(
  //   "Returns an error if the password does not match the format",
  //   async () => {
  //     const request = await superoak(app);
  //     await request.post("/signup")
  //       .send({
  //         username: "user1",
  //         firstName: "John",
  //         lastName: "Smith",
  //         password: "",
  //       })
  //       .expect(
  //         "password: should contain at least one upper case,\n    at least one lower case,\n    at least one digit,\n    at least least one special character,\n    and should have minimum eight in length.\n\n",
  //       );
  //   },
  // );

  await t.step("Returns an error if the email is missing", async () => {
    const request = await superoak(app);
    await request.post("/signup")
      .send({
        username: "john1",
        firstName: "John",
        lastName: "Smith",
        password: "jS123456789@",
      })
      .expect(400)
      .expect(/email: Expect value to be "string"/i);
  });

  await t.step(
    "Returns an error if the email does not match the format",
    async () => {
      const request = await superoak(app);
      await request.post("/signup")
        .send({
          username: "user1",
          firstName: "John",
          lastName: "Smith",
          password: "jS123456789@",
          email: "a@example",
        })
        .expect(/email: Invalid email format/i);
    },
  );

  await t.step("Returns an error if the phoneNumber is missing", async () => {
    const request = await superoak(app);
    await request.post("/signup")
      .send({
        username: "john1",
        firstName: "John",
        lastName: "Smith",
        password: "jS123456789@",
        email: "john.smith@gmail.com",
      })
      .expect(400)
      .expect(/phoneNumber: Expect value to be "string"/i);
  });

  await t.step(
    "Returns an error if the phoneNumber does not match the format",
    async () => {
      const request = await superoak(app);
      await request.post("/signup")
        .send({
          username: "user1",
          firstName: "John",
          lastName: "Smith",
          password: "jS123456789@",
          email: "john.smith@gmail.com",
          phoneNumber: "2253",
        })
        .expect(
          "phoneNumber: does not match /^[\\\\+]?[(]?[0-9]{3}[)]?[-\\s\\\\.]?[0-9]{3}[-\\s\\\\.]?[0-9]{4,8}$/",
        );
    },
  );

  await t.step("Returns an error if the birthday is missing", async () => {
    const request = await superoak(app);
    await request.post("/signup")
      .send({
        username: "john1",
        firstName: "John",
        lastName: "Smith",
        password: "jS123456789@",
        email: "john.smith@gmail.com",
        phoneNumber: "+044-123-122122",
      })
      .expect(400)
      .expect(/birthday: should be a date/i);
  });

  await t.step(
    "Returns an error if the birthday does not match the format",
    async () => {
      const request = await superoak(app);
      await request.post("/signup")
        .send({
          username: "user1",
          firstName: "John",
          lastName: "Smith",
          password: "jS123456789@",
          email: "john.smith@gmail.com",
          phoneNumber: "+044-123-122122",
          birthday: "t",
        })
        .expect(/birthday: should be a date/i);
    },
  );
  await t.step("Returns the created user", async () => {
    const request = await superoak(app);
    let done: () => void;
    const donePromise = new Promise<void>((resolve) => done = resolve);
    request.post("/signup")
      .send({
        username: "james007",
        firstName: "James",
        lastName: "Bond",
        password: "jS123456789@",
        email: "james.bond@gmail.com",
        phoneNumber: "+044-123-122122",
        birthday: "01/01/1970",
      })
      .expect(200)
      .end((err, response) => {
        if (err) {
          throw err;
        }
        const { body: { user } } = response;

        expect(user).toHaveProperty("username");
        expect(user).toHaveProperty("firstName");
        expect(user).toHaveProperty("lastName");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("birthday");
        expect(user).toHaveProperty("phoneNumber");

        done();
      });
    await donePromise;
  });
});
