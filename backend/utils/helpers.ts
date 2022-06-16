import {
  bcrypt,
  bold,
  getNumericDate,
  green,
  Header,
  ResolvedValue,
  sign,
  Status,
  ValidationError,
} from "../deps.ts";
import { CustomErrorHandler } from "../middlewares/error.ts";
import { jwtKey } from "../middlewares/auth.ts";
import ProductModel from "../services/product/product.model.ts";

export const extractBodyRequest = async <T>(
  body: Record<string, any>,
): Promise<T | undefined> => {
  let data: Record<any, any> | undefined;
  if (body.type === "json") {
    data = await body.value;
  } else if (body.type === "form") {
    data = {};
    for (const [key, value] of await body.value) {
      data[key] = value;
    }
  } else if (body.type === "form-data") {
    const formData = await body.value.read();
    data = formData.fields;
  }
  return data;
};

export const validateParamId = (input: number, keyLabel = "") => {
  const label = keyLabel || "Id";
  if (isNaN(input)) {
    throw new CustomErrorHandler(
      Status.BadRequest,
      `${label} should be a number`,
    );
  }
  return input;
};

export function validate<I, O>(
  validator: (input: I) => [ValidationError | null, ResolvedValue<O>?],
  input: I,
): O {
  const [error, data] = validator(input);
  if (error) {
    throw new CustomErrorHandler(Status.BadRequest, error.message);
  }
  return data as O;
}

export const hashPassword = async (pwd: string, salt = ""): Promise<string> => {
  const slt = salt || bcrypt.genSaltSync(12);
  const hashedPassword = await bcrypt.hash(
    pwd,
    slt,
  );

  return hashedPassword;
};

export const printSuccessMessage = (message: string) =>
  console.log(bold(green(message)));

export const generateJwtToken = async (username: string): Promise<string> => {
  const jwtHeader: Header = { alg: "HS512", typ: "JWT" };
  const jwtToken = await sign(jwtHeader, {
    exp: getNumericDate(3600),
    username,
  }, jwtKey);
  return jwtToken;
};

const formatProduct = (product: ProductModel): ProductModel => {
  return Object.assign({}, product, {
    name: product.name[0].toUpperCase() +
      product.name.slice(1, product.name.length).toLowerCase(),
  });
};

export const formatProductList = (list: ProductModel[]): ProductModel[] => {
  if (list.length) return list.map(formatProduct);
  return [];
};
