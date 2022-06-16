import { DataTypes, Model } from "../../deps.ts";
import ReviewModel from "../review/review.model.ts";

class ProductModel extends Model {
  static table = "products";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    brand: DataTypes.STRING,
    name: { type: DataTypes.STRING, unique: true },
    quantity: DataTypes.INTEGER,
    provider: DataTypes.STRING,
    price: DataTypes.FLOAT,
    imageUrl: DataTypes.STRING,
  };

  id!: string;
  brand!: string;
  name!: string;
  quantity!: number;
  provider!: string;
  price!: number;
  imageUrl!: string;

  static reviews() {
    return this.hasMany(ReviewModel);
  }
}

export default ProductModel;
