import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@nyayaai/database';
import { UserRole } from '@nyayaai/shared';
import { env } from '../config/env';
import { AppError } from '../middleware/errorHandler';

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

function generateTokens(userId: string, email: string, role: UserRole): TokenPair {
  const accessToken = jwt.sign({ userId, email, role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as SignOptions);
  const refreshToken = jwt.sign({ userId, email, role }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  } as SignOptions);
  return { accessToken, refreshToken };
}

export async function register(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
  phone?: string;
}) {
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email: data.email }, ...(data.phone ? [{ phone: data.phone }] : [])] },
  });
  if (existing) throw new AppError(409, 'User already exists with this email or phone');

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      phone: data.phone,
      passwordHash,
      role: data.role || UserRole.CITIZEN,
      profile: {
        create: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      },
    },
    include: { profile: true },
  });

  const tokens = generateTokens(user.id, user.email, user.role as UserRole);
  await storeRefreshToken(user.id, tokens.refreshToken);

  return { user: sanitizeUser(user), ...tokens };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true, advocateProfile: true },
  });

  if (!user || !user.passwordHash) throw new AppError(401, 'Invalid credentials');
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new AppError(401, 'Invalid credentials');

  if (user.status === 'SUSPENDED') throw new AppError(403, 'Account suspended');

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  const tokens = generateTokens(user.id, user.email, user.role as UserRole);
  await storeRefreshToken(user.id, tokens.refreshToken);

  return { user: sanitizeUser(user), ...tokens };
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as {
      userId: string;
      email: string;
      role: UserRole;
    };

    const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!stored || stored.expiresAt < new Date()) {
      throw new AppError(401, 'Invalid refresh token');
    }

    const tokens = generateTokens(decoded.userId, decoded.email, decoded.role);
    await prisma.refreshToken.delete({ where: { token: refreshToken } });
    await storeRefreshToken(decoded.userId, tokens.refreshToken);

    return tokens;
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(401, 'Invalid refresh token');
  }
}

export async function logout(refreshToken: string) {
  await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
}

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true, advocateProfile: true },
  });
  if (!user) throw new AppError(404, 'User not found');
  return sanitizeUser(user);
}

async function storeRefreshToken(userId: string, token: string) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await prisma.refreshToken.create({
    data: { id: uuidv4(), userId, token, expiresAt },
  });
}

function sanitizeUser(user: Record<string, unknown>) {
  const { passwordHash: _, ...safe } = user;
  return safe;
}
