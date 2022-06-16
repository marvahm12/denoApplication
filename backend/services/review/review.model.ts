import { DataTypes, Model } from "../../deps.ts";
import ProductModel from "../product/product.model.ts";
import UserModel from "../user/user.model.ts";

class ReviewModel extends Model {
  static table = "reviews";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    message: DataTypes.TEXT,
    score: DataTypes.integer(1),
  };

  static user() {
    return this.hasOne(UserModel);
  }
  static product() {
    return this.hasOne(ProductModel);
  }
}

export default ReviewModel;
