'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Home,
  ImageIcon,
  Mic,
  MessageSquare,
  MapPin,
  Briefcase,
  Info,
  Menu,
  X,
  Bot,
  CalendarDays,
} from 'lucide-react';
import { useI18n } from '@/hooks/use-i18n';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { AuthDialog } from '../features/auth-dialog';

export function Header() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navItems = [
    { href: '/', label: t.navHome, icon: Home },
    { href: '/image-diagnosis', label: t.navImageDiagnosis, icon: ImageIcon },
    { href: '/ai-assistant', label: t.navAiAssistant, icon: Bot },
    { href: '/crop-planner', label: 'Crop Planner', icon: CalendarDays },
    { href: '/location-info', label: t.navLocationInfo, icon: MapPin },
    {
      href: '/digital-solutions',
      label: t.navDigitalSolutions,
      icon: Briefcase,
    },
    { href: '/about-us', label: t.navAboutUs, icon: Info },
  ];

  const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
      <span className="font-headline text-2xl font-bold tracking-tight text-foreground">
        <span style={{ color: '#8ca89b' }}>Sprout</span>
        <span style={{ color: '#4d423d' }}>Grow</span>
      </span>
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-200 text-xs font-bold"
        style={{ color: '#4d423d' }}
      >
        Agent
      </span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>

        {/* Mobile Menu */}
        <div className="flex w-1/3 justify-start md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 p-4">
                <div className="mb-4">
                  <Logo />
                </div>
                {navItems.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                        pathname === item.href
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground/80'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex w-1/3 justify-center md:hidden">
          <Logo />
        </div>

        <div className="flex w-1/3 items-center justify-end space-x-2 md:flex-1 md:w-auto md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* You can add a search bar here if needed */}
          </div>
          <nav className="hidden items-center gap-4 text-sm md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {item.label}
              </Link>
            ))}
             <AuthDialog />
          </nav>
          <div className="md:hidden">
            <AuthDialog />
          </div>
        </div>
      </div>
    </header>
  );
}
