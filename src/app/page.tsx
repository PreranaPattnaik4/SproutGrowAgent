import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Mic, ScanEye } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/layout/header';

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-image');

  return (
    <div className="flex flex-col h-full">
      <Header title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-8">
        <section className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
            <h2 className="font-headline text-4xl md:text-6xl text-white">
              Your AI Farming Companion
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-200 font-body">
              Instant crop disease diagnosis, voice assistance, and localized
              market data to empower your farming.
            </p>
            <Button
              asChild
              className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/image-diagnosis">Get Started</Link>
            </Button>
          </div>
        </section>

        <section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium font-headline">
                  Snap & Diagnose
                </CardTitle>
                <ScanEye className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground font-body mb-4">
                  Upload a photo of a plant leaf and get an instant AI-powered
                  disease diagnosis.
                </p>
                <Button asChild variant="link" className="px-0">
                  <Link href="/image-diagnosis">Diagnose Now &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium font-headline">
                  Speak & Advise
                </CardTitle>
                <Mic className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground font-body mb-4">
                  Use your voice to ask for farming advice, weather updates, and
                  more.
                </p>
                <Button asChild variant="link" className="px-0">
                  <Link href="/voice-assistant">Ask Now &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium font-headline">
                  Local Insights
                </CardTitle>
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground font-body mb-4">
                  Get real-time market prices and government scheme information
                  for your location.
                </p>
                <Button asChild variant="link" className="px-0">
                  <Link href="/location-info">View Info &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
