
import Link from 'next/link';
import Image from 'next/image';
import {
  Leaf,
  Mic,
  Image as ImageIcon,
  MessageSquare,
  MapPin,
  ChevronRight,
  Briefcase,
  Info,
  Bot,
} from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LocationBar } from '@/components/features/location-bar';

export default function Home() {
  const trustedByItems = [
    {
      name: 'Voice-First Assistant',
      description: 'Ask anything, anytime, even in local languages.',
    },
    {
      name: 'Smart Agronomist',
      description:
        'Get personalized advice on sowing, irrigation, and pest control.',
    },
    {
      name: 'Market Rates & Forecasts',
      description: 'Stay updated on mandi prices and rainfall predictions.',
    },
    {
      name: 'Govt Schemes Simplified',
      description: 'Instantly discover eligible subsidies and how to apply.',
    },
  ];

  const features = [
    {
      title: 'Image Diagnosis',
      description: 'Snap a photo of a plant leaf and get an instant AI-powered disease diagnosis and treatment advice.',
      icon: ImageIcon,
      href: '/image-diagnosis',
      cta: 'Diagnose Crop',
    },
    {
      title: 'AI Assistant',
      description: 'Use voice or text to ask for farming advice, get weather updates, and receive real-time market information, hands-free.',
      icon: Bot,
      href: '/ai-assistant',
      cta: 'Ask a Question',
    },
  ];

  return (
    <div className="flex flex-col bg-background text-foreground">
      <main className='flex-1'>
        {/* Location Bar */}
        <LocationBar />

        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-background py-12 md:py-20">
          <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 lg:gap-16">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
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
              </div>
              <h1 className="font-headline text-4xl font-bold text-foreground md:text-5xl">
                Your AI Farming Companion
              </h1>
              <p className="text-lg text-muted-foreground">
                Instant crop disease diagnosis, voice assistance, and localized market data to empower your farming.
              </p>
            </div>
            <div className="relative mx-auto h-64 w-full max-w-lg md:h-80">
              <Image
                src="https://img.freepik.com/free-photo/smart-agriculture-iot-with-hand-planting-tree-background_17121716.jpg"
                alt="Hand planting a tree with a background of smart agriculture and IoT elements."
                layout="fill"
                className="rounded-lg object-cover shadow-2xl"
                data-ai-hint="smart agriculture IoT"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 font-headline text-3xl font-bold text-foreground">
                Your Farming Toolkit
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Everything you need for smarter farming, right at your fingertips.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col text-center">
                  <CardContent className="flex flex-1 flex-col items-center justify-between space-y-4 p-6">
                     <div className='flex flex-col items-center space-y-4'>
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <feature.icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline text-xl font-bold">
                          {feature.title}
                        </CardTitle>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    <Link href={feature.href} passHref>
                      <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        {feature.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Solutions Section */}
        <section className="bg-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-4 text-center font-headline text-3xl font-bold text-foreground">
                  Explore Our Digital Farming Services
                </h2>
                <p className="mb-8 text-muted-foreground">
                  A comprehensive suite of tools to support every aspect of your farming journey, from soil health to market sales.
                </p>
                <Link href="/digital-solutions" passHref>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Briefcase className="mr-2 h-5 w-5" />
                    View Digital Solutions
                  </Button>
                </Link>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="bg-muted/50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="font-headline text-3xl font-bold text-foreground">
                Your Trusted AI Partner in Every Season
              </h2>
              <ul className="space-y-4">
                {trustedByItems.map((item) => (
                  <li key={item.name} className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                      <ChevronRight className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="relative h-64 w-full">
                <Image
                  src="https://picsum.photos/seed/agronomist-tablet/600/400"
                  alt="An agronomist inspecting a rice paddy with a tablet computer."
                  layout="fill"
                  className="rounded-lg object-cover shadow-md"
                  data-ai-hint="agronomist tablet"
                />
              </div>
              <div className="relative h-64 w-full">
                <Image
                  src="https://picsum.photos/seed/hand-seedling/600/400"
                  alt="A pair of hands carefully holding a young plant seedling in a handful of soil."
                  layout="fill"
                  className="rounded-lg object-cover shadow-md"
                  data-ai-hint="hand seedling"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="bg-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-center font-headline text-3xl font-bold text-foreground">
                Our Mission: To Empower Farmers
              </h2>
              <p className="mb-8 text-muted-foreground">
                Learn more about our dedication to cultivating trust, nurturing
                innovation, and empowering the farming community through
                technology.
              </p>
              <Link href="/about-us" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10"
                >
                  <Info className="mr-2 h-5 w-5" />
                  About SproutGrow Agent
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
