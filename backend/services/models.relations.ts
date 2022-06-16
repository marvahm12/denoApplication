import { Relationships } from "../deps.ts";
import ReviewModel from "./review/review.model.ts";
import ProductModel from "./product/product.model.ts";
import UserModel from "./user/user.model.ts";

Relationships.belongsTo(ReviewModel, ProductModel, { foreignKey: "productId" });
Relationships.belongsTo(ReviewModel, UserModel, { foreignKey: "userId" });
