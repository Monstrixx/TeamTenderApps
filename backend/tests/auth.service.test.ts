import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../src/services/AuthService';
import { UserRepository } from '../src/repositories/UserRepository';
import * as passwordUtils from '../src/utils/password';
import * as jwtUtils from '../src/utils/jwt';
import * as tokenUtils from '../src/utils/tokens';

vi.mock('../src/repositories/UserRepository');
vi.mock('../src/utils/password');
vi.mock('../src/utils/jwt');
vi.mock('../src/utils/tokens');

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('validateCredentials', () => {
    it('should return null if user not found', async () => {
      vi.mocked(UserRepository.findByUsername).mockResolvedValue(null);

      const result = await AuthService.validateCredentials('wrong', 'pass');
      expect(result).toBeNull();
    });

    it('should return null if password invalid', async () => {
      vi.mocked(UserRepository.findByUsername).mockResolvedValue({ id: '1', passwordHash: 'hash' } as any);
      vi.mocked(passwordUtils.verifyPassword).mockResolvedValue(false);

      const result = await AuthService.validateCredentials('user', 'wrongpass');
      expect(result).toBeNull();
    });

    it('should return user if credentials are valid', async () => {
      const mockUser = { id: '1', passwordHash: 'hash' } as any;
      vi.mocked(UserRepository.findByUsername).mockResolvedValue(mockUser);
      vi.mocked(passwordUtils.verifyPassword).mockResolvedValue(true);

      const result = await AuthService.validateCredentials('user', 'pass');
      expect(result).toEqual(mockUser);
    });
  });

  describe('login', () => {
    it('should throw unauthorized if credentials are invalid', async () => {
      vi.mocked(UserRepository.findByUsername).mockResolvedValue(null);

      await expect(AuthService.login('user', 'pass', {})).rejects.toThrow('Invalid username or password');
    });

    it('should return tokens and user on success', async () => {
      const mockUser = {
        id: '1',
        passwordHash: 'hash',
        tokenVersion: 1,
        roles: [{ role: { name: 'ADMIN', permissions: [{ permission: { name: 'write' } }] } }],
        workspaces: [{ id: 'ws1' }]
      } as any;

      vi.mocked(UserRepository.findByUsername).mockResolvedValue(mockUser);
      vi.mocked(passwordUtils.verifyPassword).mockResolvedValue(true);
      vi.mocked(jwtUtils.generateAccessToken).mockReturnValue('access-token');
      vi.mocked(tokenUtils.generateOpaqueToken).mockReturnValue('refresh-token');
      vi.mocked(tokenUtils.hashOpaqueToken).mockReturnValue('hash');
      vi.mocked(UserRepository.saveRefreshToken).mockResolvedValue({} as any);
      vi.mocked(UserRepository.updateLastLogin).mockResolvedValue({} as any);

      const result = await AuthService.login('user', 'pass', { ipAddress: '127.0.0.1' });
      
      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: mockUser,
      });

      expect(UserRepository.saveRefreshToken).toHaveBeenCalledWith(expect.objectContaining({
        userId: '1',
        tokenHash: 'hash',
        ipAddress: '127.0.0.1'
      }));
    });
  });
  
  describe('refresh', () => {
    it('should throw if token is invalid or not found', async () => {
      vi.mocked(tokenUtils.hashOpaqueToken).mockReturnValue('hash');
      vi.mocked(UserRepository.findRefreshToken).mockResolvedValue(null);

      await expect(AuthService.refresh('token', {})).rejects.toThrow('Invalid refresh token');
    });

    it('should throw if token is revoked', async () => {
      vi.mocked(tokenUtils.hashOpaqueToken).mockReturnValue('hash');
      vi.mocked(UserRepository.findRefreshToken).mockResolvedValue({ revokedAt: new Date() } as any);

      await expect(AuthService.refresh('token', {})).rejects.toThrow('Refresh token revoked');
    });

    it('should generate new tokens on successful refresh', async () => {
      const mockStoredToken = { id: 'token-id', userId: 'user-1', expiresAt: new Date(Date.now() + 100000) } as any;
      const mockUser = {
        id: 'user-1',
        tokenVersion: 1,
        roles: [],
        workspaces: []
      } as any;

      vi.mocked(tokenUtils.hashOpaqueToken).mockReturnValue('hash');
      vi.mocked(UserRepository.findRefreshToken).mockResolvedValue(mockStoredToken);
      vi.mocked(UserRepository.findById).mockResolvedValue(mockUser);
      vi.mocked(jwtUtils.generateAccessToken).mockReturnValue('new-access-token');
      vi.mocked(tokenUtils.generateOpaqueToken).mockReturnValue('new-refresh-token');

      const result = await AuthService.refresh('token', {});
      
      expect(result.accessToken).toBe('new-access-token');
      expect(UserRepository.revokeRefreshToken).toHaveBeenCalledWith('token-id');
    });
  });
  
  describe('logout', () => {
    it('should revoke token if found', async () => {
      vi.mocked(tokenUtils.hashOpaqueToken).mockReturnValue('hash');
      vi.mocked(UserRepository.findRefreshToken).mockResolvedValue({ id: 'token-id' } as any);
      
      await AuthService.logout('token');
      expect(UserRepository.revokeRefreshToken).toHaveBeenCalledWith('token-id');
    });
  });
});
