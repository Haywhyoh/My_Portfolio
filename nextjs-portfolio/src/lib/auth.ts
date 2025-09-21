import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth() {
  const session = await getSession();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  return session.user;
}

export async function requireAdmin() {
  const user = await requireAuth();

  if (user.role !== 'admin') {
    throw new Error('Forbidden: Admin access required');
  }

  return user;
}

// Middleware function to protect API routes
export function withAuth(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    try {
      await requireAuth();
      return handler(request, context);
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  };
}

// Middleware function to protect admin-only API routes
export function withAdmin(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    try {
      await requireAdmin();
      return handler(request, context);
    } catch (error) {
      const status = error.message === 'Unauthorized' ? 401 : 403;
      return NextResponse.json(
        { error: error.message },
        { status }
      );
    }
  };
}