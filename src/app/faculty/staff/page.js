"use client";

import { useAuth } from '@/lib/auth';
import { AuthGuard } from '@/components/authGuard';
import { Button } from '@/components/ui/button';

export default function AbsentPage() {
  const { user, logout } = useAuth();

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Absent Management</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.name}</span>
            <Button onClick={logout}>Sign Out</Button>
          </div>
        </div>
       Hello
      </div>
    </AuthGuard>
  );
}