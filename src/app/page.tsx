import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Leaf, Mic, Image as ImageIcon, MessageSquare, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const features = [
    {
      title: 'Image Diagnosis',
      href: '/image-diagnosis',
      icon: ImageIcon,
      description: 'Snap a leaf, diagnose a disease.',
    },
    {
      title: 'Voice Assistant',
      href: '/voice-assistant',
      icon: Mic,
      description: 'Speak your question, get expert advice.',
    },
    {
      title: 'Text Chat',
      href: '/text-chat',
      icon: MessageSquare,
      description: 'Chat with our AI for instant support.',
    },
    {
      title: 'Location Info',
      href: '/location-info',
      icon: MapPin,
      description: 'Get local market prices and weather.',
    },
  ];

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      <Header title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-headline text-foreground md:text-5xl">
              Hello, Farmer!
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Your AI partner in growth and prosperity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href} passHref>
                <Card className="flex h-full transform flex-col items-center justify-center bg-accent text-accent-foreground shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <feature.icon className="mb-4 h-16 w-16" />
                    <h3 className="text-xl font-bold font-headline">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-accent-foreground/80">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-16">
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  <li>
                    Check soil moisture before irrigating to conserve water.
                  </li>
                  <li>
                    Rotate your crops each season to maintain soil health and
                    reduce pests.
                  </li>
                  <li>
                    Use the image diagnosis tool at the first sign of disease
                    for early treatment.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
