import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

export interface PresentationAttributes {
  id: string;
  projectId: string;
  title: string;
  date: string;
  venue: string;
  speaker?: string | null;
  department?: string | null;
  slidesUrl?: string | null;
  fileName?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PresentationCreationAttributes = Optional<
  PresentationAttributes,
  "id" | "speaker" | "department" | "slidesUrl" | "fileName" | "createdAt" | "updatedAt"
>;

export class Presentation
  extends Model<PresentationAttributes, PresentationCreationAttributes>
  implements PresentationAttributes
{
  declare id: string;
  declare projectId: string;
  declare title: string;
  declare date: string;
  declare venue: string;
  declare speaker: string | null;
  declare department: string | null;
  declare slidesUrl: string | null;
  declare fileName: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Presentation.init(
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
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    venue: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    speaker: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    slidesUrl: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    fileName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "presentations",
  },
);

