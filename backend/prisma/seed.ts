import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
});

async function main() {
  if (process.env.NODE_ENV === 'production') {
    console.error('Seed should not run in production!');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash('adminpassword', 10);

  // Upsert the SUPER_ADMIN role
  const adminRole = await prisma.role.upsert({
    where: { name: 'SUPER_ADMIN' },
    update: {},
    create: {
      name: 'SUPER_ADMIN',
      description: 'Super Administrator with all permissions'
    }
  });

  // Upsert wildcard permission
  const wildcardPermission = await prisma.permission.upsert({
    where: { name: '*' },
    update: {},
    create: {
      name: '*',
      description: 'All permissions'
    }
  });

  // Link permission to role
  await prisma.rolePermission.upsert({
    where: {
      roleId_permissionId: {
        roleId: adminRole.id,
        permissionId: wildcardPermission.id
      }
    },
    update: {},
    create: {
      roleId: adminRole.id,
      permissionId: wildcardPermission.id
    }
  });

  const specificPermissions = [
    'personnel.read',
    'personnel.create',
    'personnel.update',
    'personnel.delete',
    'personnel.restore',
    'personnel.verify',
    'personnel.generate.cv'
  ];

  for (const perm of specificPermissions) {
    await prisma.permission.upsert({
      where: { name: perm },
      update: {},
      create: {
        name: perm,
        description: `Permission for ${perm}`
      }
    });
  }

  // Upsert admin user
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {
      passwordHash
    },
    create: {
      username: 'admin',
      email: 'admin@teamtender.id',
      name: 'System Admin',
      passwordHash
    }
  });

  // Link user to role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id
      }
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id
    }
  });

  // Upsert Workspaces
  const workspaces = [
    { code: 'WS-000001', name: 'TeamTender Demo', description: 'Demo workspace for presentations', status: 'ACTIVE' },
    { code: 'WS-000002', name: 'TeamTender Internal', description: 'Internal testing and development', status: 'ACTIVE' },
    { code: 'WS-000003', name: 'PT ABC Construction', description: 'Client project workspace', status: 'ACTIVE' }
  ];

  for (const ws of workspaces) {
    await prisma.workspace.upsert({
      where: { code: ws.code },
      update: {},
      create: {
        code: ws.code,
        name: ws.name,
        description: ws.description,
        status: ws.status as any,
        ownerId: adminUser.id,
        createdBy: adminUser.id,
        updatedBy: adminUser.id
      }
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
