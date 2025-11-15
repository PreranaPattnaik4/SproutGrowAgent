import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import {
  Leaf,
  Mic,
  Image as ImageIcon,
  MessageSquare,
  MapPin,
  ChevronRight,
  Briefcase,
  Info,
} from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

  return (
    <div className="flex flex-col bg-background text-foreground">
      <Header title="Dashboard" />
      <main className='flex-1'>
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-background py-12 md:py-20">
          <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 lg:gap-16">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <span className="font-headline text-2xl font-bold tracking-tight text-foreground">
                  <span style={{ color: '#8ca89b' }}>Wander</span>
                  <span style={{ color: '#4d423d' }}>Wise</span>
                </span>
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-200 text-sm font-bold"
                  style={{ color: '#4d423d' }}
                >
                  AI
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
                src="https://img.freepik.com/free-photo/smart-agriculture-iot-with-hand-planting-tree-background_17121716.htm"
                alt="A pair of hands holding a young plant seedling in a handful of soil, with digital data overlays indicating growth metrics."
                layout="fill"
                className="rounded-lg object-cover shadow-2xl"
                data-ai-hint="plant growth data"
              />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-headline text-3xl font-bold text-foreground">
              Your Farming Toolkit
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Link key={feature.href} href={feature.href} passHref>
                  <Card className="flex h-full transform flex-col items-center justify-center border-0 bg-card text-card-foreground shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:bg-background/80">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <feature.icon className="mb-4 h-12 w-12 text-primary" />
                      <h3 className="font-headline text-xl font-bold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
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
                  src="https://images.unsplash.com/photo-1709141105470-f4baad5ee8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YWdyb25vbWlzdCUyMHRhYmxldHxlbnwwfHx8fDE3NjMyMDA4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="An agronomist inspecting a rice paddy with a tablet computer."
                  layout="fill"
                  className="rounded-lg object-cover shadow-md"
                  data-ai-hint="agronomist tablet"
                />
              </div>
              <div className="relative h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1746728153970-aebb6434fa8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxoYW5kJTIwc2VlZGxpbmd8ZW58MHx8fHwxNzYzMjAwODY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
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
                  About WanderWise AI
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
