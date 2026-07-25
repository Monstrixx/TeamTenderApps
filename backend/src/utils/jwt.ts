import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const ACCESS_TOKEN_EXPIRES_IN = '1h';

export interface TokenPayload {
  sub: string;
  workspaceId?: string;
  role: string[];
  permissions: string[];
  tokenVersion: number;
}

export const generateAccessToken = (payload: Omit<TokenPayload, 'iat' | 'exp'>) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

export const decodeJWT = (token: string): TokenPayload | null => {
  return jwt.decode(token) as TokenPayload | null;
};
