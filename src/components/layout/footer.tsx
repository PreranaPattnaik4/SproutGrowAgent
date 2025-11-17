'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Separator } from '../ui/separator';

const socialLinks = [
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Twitter, label: 'Twitter' },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Linkedin, label: 'LinkedIn' },
];

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/help', label: 'Help' },
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

export function Footer() {
  return (
    <footer className="bg-muted/50">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex justify-center text-center lg:justify-start lg:text-left">
            <div className="space-y-4">
              <Logo />
              <p className="max-w-xs text-sm text-muted-foreground">
                Your AI Farming Companion for a prosperous harvest.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-3 lg:col-span-2 lg:text-left">
            <div>
              <p className="font-headline font-semibold text-foreground">
                Quick Links
              </p>
              <nav className="mt-4 flex flex-col space-y-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="font-headline font-semibold text-foreground">
                Services
              </p>
              <nav className="mt-4 flex flex-col space-y-2">
                <Link
                  href="/image-diagnosis"
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  Image Diagnosis
                </Link>
                <Link
                  href="/ai-assistant"
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  AI Assistant
                </Link>
                <Link
                  href="/digital-solutions"
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  Digital Solutions
                </Link>
              </nav>
            </div>

            <div>
              <p className="font-headline font-semibold text-foreground">
                Connect
              </p>
              <div className="mt-4 flex justify-center gap-4 lg:justify-start">
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-primary"
                    aria-label={link.label}
                  >
                    <link.icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} SproutGrow Agent. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
