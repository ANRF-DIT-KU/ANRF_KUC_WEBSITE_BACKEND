import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";
import { AccountRole } from "./Account.js";

export interface GalleryItemAttributes {
  id: string;
  projectId: string;
  src: string;
  caption?: string | null;
  uploadedBy?: AccountRole | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type GalleryItemCreationAttributes = Optional<
  GalleryItemAttributes,
  "id" | "caption" | "uploadedBy" | "createdAt" | "updatedAt"
>;

export class GalleryItem
  extends Model<GalleryItemAttributes, GalleryItemCreationAttributes>
  implements GalleryItemAttributes
{
  declare id: string;
  declare projectId: string;
  declare src: string;
  declare caption: string | null;
  declare uploadedBy: AccountRole | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

GalleryItem.init(
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
    src: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    uploadedBy: {
      type: DataTypes.ENUM("pi", "member"),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "gallery_items",
  },
);

