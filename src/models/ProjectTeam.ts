import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export interface TeamPiInfo {
  name: string;
  role: string;
  affiliation: string;
}

export interface TeamCoInvestigator {
  name: string;
}

export interface TeamMember {
  name: string;
  role: string;
  email: string;
}

export interface ProjectTeamAttributes {
  projectId: string;
  projectTitle: string;
  pi: TeamPiInfo;
  coInvestigators: TeamCoInvestigator[];
  members: TeamMember[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProjectTeam
  extends Model<ProjectTeamAttributes>
  implements ProjectTeamAttributes
{
  declare projectId: string;
  declare projectTitle: string;
  declare pi: TeamPiInfo;
  declare coInvestigators: TeamCoInvestigator[];
  declare members: TeamMember[];
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

ProjectTeam.init(
  {
    projectId: {
      type: DataTypes.STRING(64),
      primaryKey: true,
    },
    projectTitle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pi: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    coInvestigators: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    members: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: "project_teams",
  },
);

