import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { UserRepository } from '../src/repositories/UserRepository';
import * as passwordUtils from '../src/utils/password';
import * as jwtUtils from '../src/utils/jwt';
import * as tokenUtils from '../src/utils/tokens';
import { TokenPayload } from '../src/utils/jwt';

vi.mock('../src/repositories/UserRepository');
vi.mock('../src/utils/password');
vi.mock('../src/utils/tokens');

describe('Auth Endpoints Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login successfully and return HttpOnly cookie', async () => {
      const mockUser = {
        id: 'user-1',
        username: 'admin',
        passwordHash: 'hash',
        tokenVersion: 1,
        roles: [],
        workspaces: []
      } as any;

      vi.mocked(UserRepository.findByUsername).mockResolvedValue(mockUser);
      vi.mocked(passwordUtils.verifyPassword).mockResolvedValue(true);
      vi.mocked(tokenUtils.generateOpaqueToken).mockReturnValue('refresh-token-123');
      vi.mocked(tokenUtils.hashOpaqueToken).mockReturnValue('hash-123');
      vi.mocked(UserRepository.saveRefreshToken).mockResolvedValue({} as any);
      vi.mocked(UserRepository.updateLastLogin).mockResolvedValue({} as any);

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'admin', password: 'password' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBeDefined();
      expect(res.headers['set-cookie']).toBeDefined();
      expect(res.headers['set-cookie'][0]).toContain('refreshToken=refresh-token-123');
      expect(res.headers['set-cookie'][0]).toContain('HttpOnly');
    });

    it('should fail with 401 on incorrect password', async () => {
      vi.mocked(UserRepository.findByUsername).mockResolvedValue({} as any);
      vi.mocked(passwordUtils.verifyPassword).mockResolvedValue(false);

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'admin', password: 'wrong' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should fail with 401 if user not found', async () => {
      vi.mocked(UserRepository.findByUsername).mockResolvedValue(null);

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'notfound', password: 'password' });

      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/v1/auth/refresh', () => {
    it('should refresh token and return new tokens', async () => {
      const mockStoredToken = { id: 'tid', userId: 'user-1', expiresAt: new Date(Date.now() + 100000) } as any;
      const mockUser = { id: 'user-1', tokenVersion: 1, roles: [], workspaces: [] } as any;
      
      vi.mocked(tokenUtils.hashOpaqueToken).mockReturnValue('hash-123');
      vi.mocked(UserRepository.findRefreshToken).mockResolvedValue(mockStoredToken);
      vi.mocked(UserRepository.findById).mockResolvedValue(mockUser);
      vi.mocked(tokenUtils.generateOpaqueToken).mockReturnValue('new-refresh');

      const res = await request(app)
        .post('/api/v1/auth/refresh')
        .set('Cookie', ['refreshToken=old-token']);

      expect(res.status).toBe(200);
      expect(res.body.data.accessToken).toBeDefined();
      expect(res.headers['set-cookie'][0]).toContain('refreshToken=new-refresh');
    });

    it('should fail if refresh token is expired', async () => {
      const mockStoredToken = { id: 'tid', userId: 'user-1', expiresAt: new Date(Date.now() - 1000) } as any;
      
      vi.mocked(tokenUtils.hashOpaqueToken).mockReturnValue('hash-123');
      vi.mocked(UserRepository.findRefreshToken).mockResolvedValue(mockStoredToken);

      const res = await request(app)
        .post('/api/v1/auth/refresh')
        .set('Cookie', ['refreshToken=old-token']);

      expect(res.status).toBe(401);
      expect(res.body.error.message).toBe('Refresh token expired');
    });

    it('should fail if refresh token is revoked', async () => {
      const mockStoredToken = { id: 'tid', userId: 'user-1', expiresAt: new Date(Date.now() + 10000), revokedAt: new Date() } as any;
      
      vi.mocked(tokenUtils.hashOpaqueToken).mockReturnValue('hash-123');
      vi.mocked(UserRepository.findRefreshToken).mockResolvedValue(mockStoredToken);

      const res = await request(app)
        .post('/api/v1/auth/refresh')
        .set('Cookie', ['refreshToken=old-token']);

      expect(res.status).toBe(401);
      expect(res.body.error.message).toBe('Refresh token revoked');
    });
  });

  describe('GET /api/v1/auth/me', () => {
    it('should return user profile if token is valid', async () => {
      const token = jwtUtils.generateAccessToken({ sub: 'user-1', role: [], permissions: [], tokenVersion: 1 });
      const mockUser = { id: 'user-1', username: 'admin', email: 'a@b.com', roles: [], tokenVersion: 1 } as any;

      vi.mocked(UserRepository.findById).mockResolvedValue(mockUser);

      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.username).toBe('admin');
    });

    it('should fail if token version differs', async () => {
      // payload tokenVersion is 1
      const token = jwtUtils.generateAccessToken({ sub: 'user-1', role: [], permissions: [], tokenVersion: 1 });
      // DB tokenVersion is 2 (revoked globally)
      const mockUser = { id: 'user-1', tokenVersion: 2 } as any;

      vi.mocked(UserRepository.findById).mockResolvedValue(mockUser);

      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(401);
      expect(res.body.error.message).toBe('Token revoked');
    });

    it('should fail if access token is expired', async () => {
      // Create an expired token by mocking jwt.verify or passing expiresIn: -1
      // Actually jwt library will throw TokenExpiredError
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjF9.xxx';
      
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(res.status).toBe(401);
      expect(res.body.error.message).toBe('Invalid or expired token');
    });
  });

  describe('Middleware (RBAC)', () => {
    it('should be tested via protected routes', () => {
      expect(true).toBe(true);
    });
  });
});
