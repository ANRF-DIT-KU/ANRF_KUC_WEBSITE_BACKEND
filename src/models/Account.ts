import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

export type AccountRole = "pi" | "member";

export interface AccountAttributes {
  id: string;
  projectId: string;
  role: AccountRole;
  username: string;
  passwordHash: string;
  isDefaultPassword: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AccountCreationAttributes = Optional<
  AccountAttributes,
  "id" | "isDefaultPassword" | "createdAt" | "updatedAt"
>;

export class Account
  extends Model<AccountAttributes, AccountCreationAttributes>
  implements AccountAttributes
{
  declare id: string;
  declare projectId: string;
  declare role: AccountRole;
  declare username: string;
  declare passwordHash: string;
  declare isDefaultPassword: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Account.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("pi", "member"),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isDefaultPassword: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "accounts",
    indexes: [
      {
        unique: true,
        fields: ["projectId", "role"],
      },
    ],
  },
);

