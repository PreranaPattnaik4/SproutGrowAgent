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
    <div className="flex h-full flex-col bg-background text-foreground">
      <Header title="Dashboard" />
      <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="relative bg-background px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div className="relative h-96 w-full">
              <Image
                src="https://img.freepik.com/free-photo/smart-agriculture-iot-with-hand-planting-tree-background_17121716.htm"
                alt="A pair of hands holding a young plant seedling in a handful of soil, with digital data overlays indicating growth metrics."
                layout="fill"
                className="rounded-lg object-cover shadow-2xl"
                data-ai-hint="plant growth data"
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Leaf className="h-10 w-10 text-primary" />
                <span className="font-headline text-2xl font-bold tracking-wider text-gray-700">
                  SPROUTGROW AGENT
                </span>
              </div>

              <h1 className="font-headline text-3xl font-bold text-primary md:text-4xl">
                HELPING CROPS SPROUT, GROW, AND FLOURISH WITH SMART AI SUPPORT
              </h1>
              <p className="text-base text-muted-foreground">
                India's first voice-based AI farming assistant that brings
                expert guidance, crop care, and government schemes to your
                fingertips — even offline.
              </p>
              <p className="text-sm italic text-gray-500">
                An AI Agent Grown with Care, For Farmers Who Grow the Nation
              </p>
              <div className="flex justify-center pt-4 md:justify-end">
                <div className="relative h-40 w-64">
                  <Image
                    src="https://images.unsplash.com/photo-1726231591275-77a09031d11a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxmYXJtZXJzJTIwcHJvZHVjZXxlbnwwfHx8fDE3NjMyMDA4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="An illustration of a male and female farmer holding a basket of fresh produce."
                    layout="fill"
                    className="object-contain"
                    data-ai-hint="farmers produce"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="bg-secondary/20 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center font-headline text-3xl font-bold text-primary">
              Your Farming Toolkit
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Link key={feature.href} href={feature.href} passHref>
                  <Card className="flex h-full transform flex-col items-center justify-center bg-accent text-accent-foreground shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <feature.icon className="mb-4 h-12 w-12" />
                      <h3 className="font-headline text-xl font-bold">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm text-accent-foreground/80">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="font-headline text-3xl font-bold text-primary">
                Your Trusted AI Partner in Every Season
              </h2>
              <ul className="space-y-4">
                {trustedByItems.map((item) => (
                  <li key={item.name} className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                      <ChevronRight className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
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
      </main>
    </div>
  );
}
