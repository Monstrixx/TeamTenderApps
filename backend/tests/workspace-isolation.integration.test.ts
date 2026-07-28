import request from 'supertest';
import app from '../src/app';
import prisma from '../src/database/prisma';
import { generateToken } from '../src/utils/jwt';

describe('Workspace Isolation (Cross-Tenant Attack Test)', () => {
  let userA: any;
  let userB: any;
  let workspaceA: any;
  let workspaceB: any;
  let tokenA: string;
  let tokenB: string;

  beforeAll(async () => {
    // 1. Create User A and User B
    userA = await prisma.user.create({
      data: {
        email: 'user-a@attack-test.com',
        password: 'Password123!',
        name: 'User A',
      },
    });

    userB = await prisma.user.create({
      data: {
        email: 'user-b@attack-test.com',
        password: 'Password123!',
        name: 'User B',
      },
    });

    // 2. Create Workspace A and B
    workspaceA = await prisma.workspace.create({
      data: {
        name: 'Workspace A',
        slug: 'workspace-a-isolation',
        ownerId: userA.id,
      },
    });

    workspaceB = await prisma.workspace.create({
      data: {
        name: 'Workspace B',
        slug: 'workspace-b-isolation',
        ownerId: userB.id,
      },
    });

    // 3. Create Admin Roles
    const roleA = await prisma.workspaceRole.create({
      data: {
        workspaceId: workspaceA.id,
        name: 'Admin',
        type: 'ADMIN',
        permissions: ['company.read', 'personnel.read', 'personnel.create'],
      },
    });

    const roleB = await prisma.workspaceRole.create({
      data: {
        workspaceId: workspaceB.id,
        name: 'Admin',
        type: 'ADMIN',
        permissions: ['company.read', 'personnel.read', 'personnel.create'],
      },
    });

    // 4. Assign Members
    await prisma.workspaceMember.create({
      data: {
        workspaceId: workspaceA.id,
        userId: userA.id,
        roleId: roleA.id,
        status: 'ACTIVE',
      },
    });

    await prisma.workspaceMember.create({
      data: {
        workspaceId: workspaceB.id,
        userId: userB.id,
        roleId: roleB.id,
        status: 'ACTIVE',
      },
    });

    // 5. Generate Tokens
    tokenA = generateToken({ sub: userA.id, email: userA.email });
    tokenB = generateToken({ sub: userB.id, email: userB.email });

    // 6. Create Target Data in Workspace B
    await prisma.personnel.create({
      data: {
        workspaceId: workspaceB.id,
        name: 'Target Personnel B',
        nik: 'NIK-B-12345',
      },
    });
  });

  afterAll(async () => {
    // Cleanup
    await prisma.personnel.deleteMany({
      where: { workspaceId: { in: [workspaceA.id, workspaceB.id] } },
    });
    await prisma.workspaceMember.deleteMany({
      where: { workspaceId: { in: [workspaceA.id, workspaceB.id] } },
    });
    await prisma.workspaceRole.deleteMany({
      where: { workspaceId: { in: [workspaceA.id, workspaceB.id] } },
    });
    await prisma.workspace.deleteMany({
      where: { id: { in: [workspaceA.id, workspaceB.id] } },
    });
    await prisma.user.deleteMany({
      where: { id: { in: [userA.id, userB.id] } },
    });
  });

  it('should prevent User A from accessing Workspace B data using Workspace B ID in headers', async () => {
    // User A tries to get Personnels from Workspace B
    const res = await request(app)
      .get('/api/v1/personnels')
      .set('Authorization', `Bearer ${tokenA}`)
      .set('x-workspace-id', workspaceB.id);

    // Should be Forbidden or Unauthorized because User A is not a member of Workspace B
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/not a member/i);
  });

  it('should prevent User A from accessing Workspace B data using Workspace A ID but querying Workspace B data', async () => {
    // User A requests from Workspace A
    const res = await request(app)
      .get('/api/v1/personnels')
      .set('Authorization', `Bearer ${tokenA}`)
      .set('x-workspace-id', workspaceA.id);

    expect(res.status).toBe(200);
    // Since Personnel B is in Workspace B, the TenantRepository should automatically filter it out
    // User A's response should be empty because they have no personnel in Workspace A
    expect(res.body.data.data).toHaveLength(0);
  });
});
