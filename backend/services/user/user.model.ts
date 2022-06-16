import { DataTypes, Model } from "../../deps.ts";
import ReviewModel from "../review/review.model.ts";

class UserModel extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    phoneNumber: DataTypes.STRING,
  };

  id!: string;
  firstName!: string;
  lastName!: string;
  username!: string;
  email!: string;
  password!: string;
  birthday!: Date;
  phoneNumber!: string;

  static reviews() {
    return this.hasMany(ReviewModel);
  }
}

export default UserModel;
