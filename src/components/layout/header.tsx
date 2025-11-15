'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-transparent px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="md:hidden" />
    </header>
  );
}
