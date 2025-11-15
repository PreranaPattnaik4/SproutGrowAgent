'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ImageIcon,
  Mic,
  MessageSquare,
  MapPin,
  Leaf,
} from 'lucide-react';

import { useI18n } from '@/hooks/use-i18n';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { Language } from '@/providers/i18n-provider';

export function SidebarNav() {
  const pathname = usePathname();
  const { t, language, setLanguage } = useI18n();

  const navItems = [
    { href: '/', label: t.navHome, icon: Home },
    { href: '/image-diagnosis', label: t.navImageDiagnosis, icon: ImageIcon },
    { href: '/voice-assistant', label: t.navVoiceAssistant, icon: Mic },
    { href: '/text-chat', label: t.navTextChat, icon: MessageSquare },
    { href: '/location-info', label: t.navLocationInfo, icon: MapPin },
  ];

  return (
    <nav className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-4 py-6">
        <Leaf className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-headline text-white">{t.appName}</h1>
      </div>
      <ul className="flex flex-grow flex-col gap-2 px-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                pathname === item.href &&
                  'bg-sidebar-accent text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto p-4">
        <label className="mb-2 block text-sm font-medium text-sidebar-foreground/70">
          {t.navLanguage}
        </label>
        <Select
          value={language}
          onValueChange={(value) => setLanguage(value as Language)}
        >
          <SelectTrigger className="w-full border-sidebar-border bg-sidebar-accent text-sidebar-accent-foreground">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            {/* Add more languages here */}
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
}
