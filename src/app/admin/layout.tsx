'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Calendar, LogOut, ToggleRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Logo from '@/LOGO_BIG_B.svg';

function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = () => {
        sessionStorage.removeItem('isAdmin');
        toast({
            title: 'Logged Out',
            description: 'You have been successfully logged out.',
        });
        router.push('/admin/login');
    };

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: Home },
        { href: '/admin/events', label: 'Manage Events', icon: Calendar },
        { href: '/admin/status', label: 'Site Status', icon: ToggleRight },
    ];

    return (
        <aside className="w-64 flex-shrink-0 border-r border-border bg-card p-6 flex flex-col">
             <div className="mb-8">
                <Link href="/admin">
                   <Image src={Logo} alt="Dungeon Pub Logo" className="h-20 w-auto" />
                </Link>
              </div>
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-4 py-3 text-card-foreground transition-colors hover:bg-muted',
                            pathname === item.href || (item.href === '/admin/events' && pathname.startsWith('/admin/events')) ? 'bg-primary/10 text-primary' : ''
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="mt-auto">
                <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                </Button>
            </div>
        </aside>
    );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (isAdmin !== 'true') {
          router.replace('/admin/login');
        }
      } catch (e) {
        // sessionStorage is not available
        router.replace('/admin/login');
      }
    }
  }, [router, isClient]);
  
  // This is a special case for the login page itself to avoid redirect loops.
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  if (!isClient) {
    return null; // or a loading spinner
  }

  try {
     if (sessionStorage.getItem('isAdmin') !== 'true') {
        return null; // or a loading spinner while redirecting
     }
  } catch (e) {
     return null;
  }

  return (
    <div className="flex min-h-dvh bg-background">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8">
            {children}
        </main>
    </div>
  );
}
