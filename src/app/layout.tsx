import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { I18nProvider } from '@/providers/i18n-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
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
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-body antialiased bg-background flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        <I18nProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
