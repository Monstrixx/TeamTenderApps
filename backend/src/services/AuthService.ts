import { UserRepository } from '../repositories/UserRepository';
import { verifyPassword } from '../utils/password';
import { generateAccessToken, TokenPayload } from '../utils/jwt';
import { generateOpaqueToken, hashOpaqueToken } from '../utils/tokens';
import { ApiError } from '../common/responses/ApiError';

export class AuthService {
  static async validateCredentials(username: string, password: string) {
    const user = await UserRepository.findByUsername(username);
    if (!user) {
      return null;
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return null;
    }

    return user;
  }

  static async login(
    username: string,
    password: string,
    context: { deviceId?: string; ipAddress?: string; userAgent?: string }
  ) {
    const user = await this.validateCredentials(username, password);
    if (!user) {
      throw ApiError.unauthorized('Invalid username or password');
    }

    // Generate tokens
    const roles = user.roles.map((ur) => ur.role.name);
    const permissions = user.roles.flatMap((ur) => ur.role.permissions.map((rp) => rp.permission.name));
    
    // Defaulting to the first workspace if any, this is just for payload structure
    const workspaceId = (user as unknown as { workspaces?: { id: string }[] }).workspaces?.[0]?.id;

    const payload: Omit<TokenPayload, 'iat' | 'exp'> = {
      sub: user.id,
      workspaceId,
      role: roles,
      permissions,
      tokenVersion: user.tokenVersion,
    };

    const accessToken = generateAccessToken(payload);
    
    // Refresh token
    const refreshToken = generateOpaqueToken();
    const tokenHash = hashOpaqueToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await UserRepository.saveRefreshToken({
      userId: user.id,
      tokenHash,
      deviceId: context.deviceId,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      expiresAt,
    });

    await UserRepository.updateLastLogin(user.id);

    return { accessToken, refreshToken, user };
  }

  static async refresh(
    refreshToken: string,
    context: { deviceId?: string; ipAddress?: string; userAgent?: string }
  ) {
    const tokenHash = hashOpaqueToken(refreshToken);
    const storedToken = await UserRepository.findRefreshToken(tokenHash);

    if (!storedToken) {
      throw ApiError.unauthorized('Invalid refresh token');
    }

    if (storedToken.revokedAt) {
      throw ApiError.unauthorized('Refresh token revoked');
    }

    if (storedToken.expiresAt < new Date()) {
      throw ApiError.unauthorized('Refresh token expired');
    }

    const user = await UserRepository.findById(storedToken.userId);
    if (!user) {
      throw ApiError.unauthorized('User not found');
    }

    // Revoke old token
    await UserRepository.revokeRefreshToken(storedToken.id);

    // Generate new tokens
    const roles = user.roles.map((ur) => ur.role.name);
    const permissions = user.roles.flatMap((ur) => ur.role.permissions.map((rp) => rp.permission.name));
    const workspaceId = (user as unknown as { workspaces?: { id: string }[] }).workspaces?.[0]?.id;

    const payload: Omit<TokenPayload, 'iat' | 'exp'> = {
      sub: user.id,
      workspaceId,
      role: roles,
      permissions,
      tokenVersion: user.tokenVersion,
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateOpaqueToken();
    const newTokenHash = hashOpaqueToken(newRefreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await UserRepository.saveRefreshToken({
      userId: user.id,
      tokenHash: newTokenHash,
      deviceId: context.deviceId,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      expiresAt,
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken, user };
  }

  static async logout(refreshToken: string) {
    const tokenHash = hashOpaqueToken(refreshToken);
    const storedToken = await UserRepository.findRefreshToken(tokenHash);

    if (storedToken && !storedToken.revokedAt) {
      await UserRepository.revokeRefreshToken(storedToken.id);
    }
  }

  static async me(userId: string) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }
    return user;
  }
}
