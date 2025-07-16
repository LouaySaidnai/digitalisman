'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminProtectionProps {
  children: React.ReactNode;
}

export default function AdminProtection({ children }: AdminProtectionProps) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/admin/auth/check');
      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-4">Vérification des droits d'accès...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B7355] mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    router.push('/admin/login');
    return null;
  }

  return <>{children}</>;
} 