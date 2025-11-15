import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { I18nProvider } from '@/providers/i18n-provider';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { ChatbotPopup } from '@/components/features/chatbot-popup';
import './globals.css';

export const metadata: Metadata = {
  title: 'SproutGrow Agent',
  description: 'Your AI Farming Companion',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Belleza&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-body antialiased bg-background"
        suppressHydrationWarning
      >
        <I18nProvider>
          <SidebarProvider>
            <Sidebar>
              <SidebarNav />
            </Sidebar>
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
          <ChatbotPopup />
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
