import { Connector, Database, Model } from "../deps.ts";
import db from "./db.config.ts";
import UserModel from "../services/user/user.model.ts";
import ProductModel from "../services/product/product.model.ts";
import ReviewModel from "../services/review/review.model.ts";
import dbTest from "../test/db.config.ts";
import { printSuccessMessage } from "../utils/helpers.ts";
import "../services/models.relations.ts";

const models = [UserModel, ProductModel, ReviewModel];

const connectDb = async (db: Database): Promise<boolean> => {
  await db.getConnector()._makeConnection();
  const connected = await db.getConnector()._connected;
  if (!connected) throw Error("Database connection Failure");
  return connected;
};

const fetchExistentTablesInDb = async (
  connector: Connector,
): Promise<string[]> => {
  let tableNames = [];
  const modelNames = models.map((model) => model.table);
  const existentRecords = await connector.query({
    schema: {} as any,
    table: "pg_catalog.pg_tables",
    wheres: [{ field: "schemaname", operator: "=", value: "public" }],
  });
  if (existentRecords.length) {
    tableNames = existentRecords.reduce(
      (acc: string[], { tablename }: { tablename: string }) => {
        if (!acc.includes(tablename) && modelNames.includes(tablename)) {
          acc.push(tablename);
        }
        return acc;
      },
      [],
    );
  }
  return tableNames;
};

const createNewTablesInDb = async (
  db: Database,
  models: typeof Model[],
  cb: void,
) => {
  const existentTablesInDb = await fetchExistentTablesInDb(db.getConnector());
  const numberOfExistentTablesInDb = existentTablesInDb.length;
  if (!numberOfExistentTablesInDb) {
    await db.sync();
    return cb;
  }
  if (
    numberOfExistentTablesInDb && numberOfExistentTablesInDb === models.length
  ) {
    return;
  }
  const newModelsToCreate = models.filter((model) =>
    !existentTablesInDb.includes(model.table)
  );
  const createTablePromises = newModelsToCreate.map(async (model) => {
    await model.createTable();
  });
  await Promise.all(createTablePromises);
  return;
};

export const synchronizeDb = async (db: Database) => {
  try {
    const connected = await connectDb(db);
    if (connected) {
      db.link(models);
      await createNewTablesInDb(
        db,
        models,
        printSuccessMessage("Tables created successfully."),
      );
    }
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

type ModelType = typeof UserModel | typeof ProductModel | typeof ReviewModel;

export const purgeDb = async (db: Database) => {
  try {
    const connected = await connectDb(db);
    if (connected) {
      // fetch the existent tables in the db
      const existentTablesInDb = await fetchExistentTablesInDb(
        db.getConnector(),
      );
      // filter the existent models to drop
      const existentModels: ModelType[] = existentTablesInDb.map(
        (tableName) => {
          const foundModel = models
            .find((model) => model.table === tableName);
          if (foundModel) return foundModel;
        },
      )
        .filter((model: ModelType | undefined): model is ModelType =>
          model !== undefined
        );
      // keep the order of the drop due to dependency
      const modelsToDrop = models.slice().reverse().filter((model) => {
        const found = existentModels.find((e: ModelType) =>
          e.table === model.table
        );
        return found;
      });
      const dropPromises = modelsToDrop.map(
        async (model) => {
          await db.query({
            schema: model,
            table: model.table,
            ifExists: true,
            type: "drop",
          });
        },
      );
      await Promise.all(dropPromises);
      printSuccessMessage("Database purged.");
    }
  } catch (error) {
    throw error;
  }
};

export const setUpDb = async () => {
  const database = Deno.env.get("ENVIRONMENT") === "test" ? dbTest : db;
  await synchronizeDb(database);
};

export const cleanDb = async () => {
  const database = Deno.env.get("ENVIRONMENT") === "test" ? dbTest : db;
  await purgeDb(database);
};

export const closeDb = async () => {
  const database = Deno.env.get("ENVIRONMENT") === "test" ? dbTest : db;
  await database.close();
};
