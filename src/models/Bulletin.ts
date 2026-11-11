import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

export interface BulletinAttributes {
  id: string;
  projectId: string;
  volume: string;
  issue: string;
  title: string;
  summary: string;
  publishDate?: string | null;
  themeColor: "teal" | "navy";
  downloadUrl: string;
  fileName?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type BulletinCreationAttributes = Optional<
  BulletinAttributes,
  "id" | "publishDate" | "downloadUrl" | "fileName" | "createdAt" | "updatedAt"
>;

export class Bulletin
  extends Model<BulletinAttributes, BulletinCreationAttributes>
  implements BulletinAttributes
{
  declare id: string;
  declare projectId: string;
  declare volume: string;
  declare issue: string;
  declare title: string;
  declare summary: string;
  declare publishDate: string | null;
  declare themeColor: "teal" | "navy";
  declare downloadUrl: string;
  declare fileName: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Bulletin.init(
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
    volume: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    issue: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publishDate: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    themeColor: {
      type: DataTypes.ENUM("teal", "navy"),
      allowNull: false,
      defaultValue: "teal",
    },
    downloadUrl: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: "#",
    },
    fileName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "bulletins",
  },
);

