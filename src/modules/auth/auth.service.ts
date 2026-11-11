import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { env } from "../../config/env.js";
import { Account, AccountRole } from "../../models/index.js";
import { AppError } from "../../utils/AppError.js";

export interface AuthUserDto {
  id: string;
  projectId: string;
  role: AccountRole;
  username: string;
  isDefaultPassword: boolean;
  updatedAt: string;
}

const toDto = (acc: Account): AuthUserDto => ({
  id: acc.id,
  projectId: acc.projectId,
  role: acc.role,
  username: acc.username,
  isDefaultPassword: acc.isDefaultPassword,
  updatedAt: acc.updatedAt.toISOString(),
});

export async function loginService(username: string, password: string) {
  const acc = await Account.findOne({
    where: { username: username.trim() },
  });

  if (!acc || !(await bcrypt.compare(password, acc.passwordHash))) {
    throw new AppError("Invalid username or password.", 401);
  }

  const user = toDto(acc);
  const token = jwt.sign(
    {
      sub: acc.id,
      projectId: acc.projectId,
      role: acc.role,
      username: acc.username,
    },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn as jwt.SignOptions["expiresIn"] },
  );

  return { token, user };
}

export async function getMeService(accountId: string) {
  const acc = await Account.findByPk(accountId);
  if (!acc) throw new AppError("Account not found.", 404);
  return toDto(acc);
}

export async function getProjectAccountsService(projectId: string) {
  const accounts = await Account.findAll({
    where: { projectId },
    order: [["role", "ASC"]],
  });

  return accounts.map((acc) => ({
    projectId: acc.projectId,
    role: acc.role,
    username: acc.username,
    isDefaultPassword: acc.isDefaultPassword,
    updatedAt: acc.updatedAt.toISOString(),
  }));
}

export interface UpdateCredentialsInput {
  actorId: string;
  actorProjectId: string;
  actorRole: AccountRole;
  targetRole: AccountRole;
  currentPassword: string;
  newUsername?: string;
  newPassword?: string;
}

export async function updateCredentialsService(input: UpdateCredentialsInput) {
  const {
    actorId,
    actorProjectId,
    actorRole,
    targetRole,
    currentPassword,
    newUsername,
    newPassword,
  } = input;

  if (actorRole !== "pi" && targetRole !== actorRole) {
    throw new AppError("You can only change the credentials of your own account.", 403);
  }

  const actor = await Account.findByPk(actorId);
  if (!actor || !(await bcrypt.compare(currentPassword, actor.passwordHash))) {
    throw new AppError("Your current password is incorrect.", 400);
  }

  const target = await Account.findOne({
    where: { projectId: actorProjectId, role: targetRole },
  });
  if (!target) {
    throw new AppError("Target account not found.", 404);
  }

  const nextUsername = newUsername?.trim() || target.username;
  if (!/^[a-zA-Z0-9._-]{3,32}$/.test(nextUsername)) {
    throw new AppError("Username must be 3–32 characters (letters, numbers, . _ -).", 400);
  }

  const duplicate = await Account.findOne({
    where: {
      username: nextUsername,
      id: { [Op.ne]: target.id },
    },
  });
  if (duplicate) {
    throw new AppError("That username is already taken.", 409);
  }

  target.username = nextUsername;

  if (newPassword) {
    if (newPassword.length < 8) {
      throw new AppError("Password must be at least 8 characters.", 400);
    }
    target.passwordHash = await bcrypt.hash(newPassword, 10);
    target.isDefaultPassword = false;
  }

  await target.save();

  return {
    projectId: target.projectId,
    role: target.role,
    username: target.username,
    isDefaultPassword: target.isDefaultPassword,
    updatedAt: target.updatedAt.toISOString(),
  };
}

