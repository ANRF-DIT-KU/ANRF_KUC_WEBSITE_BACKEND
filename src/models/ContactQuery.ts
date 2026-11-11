import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

export interface ContactQueryAttributes {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  projectId: string;
  read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ContactQueryCreationAttributes = Optional<
  ContactQueryAttributes,
  "id" | "read" | "createdAt" | "updatedAt"
>;

export class ContactQuery
  extends Model<ContactQueryAttributes, ContactQueryCreationAttributes>
  implements ContactQueryAttributes
{
  declare id: string;
  declare name: string;
  declare email: string;
  declare subject: string;
  declare message: string;
  declare projectId: string;
  declare read: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

ContactQuery.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: "general",
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "contact_queries",
  },
);

