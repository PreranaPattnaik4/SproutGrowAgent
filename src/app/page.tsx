import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Leaf, ChevronRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroMainImage = PlaceHolderImages.find((p) => p.id === 'hero-main-bg');
  const heroFarmersImage = PlaceHolderImages.find(
    (p) => p.id === 'hero-farmers'
  );
  const heroBgOverlayImage = PlaceHolderImages.find(
    (p) => p.id === 'hero-bg-overlay'
  );
  const trustedAgronomistImage = PlaceHolderImages.find(
    (p) => p.id === 'trusted-agronomist'
  );
  const trustedSeedlingImage = PlaceHolderImages.find(
    (p) => p.id === 'trusted-seedling'
  );

  const features = [
    {
      title: 'Voice-First Assistant',
      description: 'Ask anything, anytime, even in local languages.',
    },
    {
      title: 'Smart Agronomist',
      description: 'Get personalized advice on sowing, irrigation, and pest control.',
    },
    {
      title: 'Market Rates & Forecasts',
      description: 'Stay updated on mandi prices and rainfall predictions.',
    },
    {
      title: 'Govt Schemes Simplified',
      description: 'Instantly discover eligible subsidies and how to apply.',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white text-gray-800">
      <Header title="Dashboard" />
      <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="relative bg-background pt-8 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side */}
            <div className="relative h-80 w-full">
              {heroBgOverlayImage && (
                <Image
                  src={heroBgOverlayImage.imageUrl}
                  alt={heroBgOverlayImage.description}
                  layout="fill"
                  className="object-cover rounded-lg opacity-30"
                  data-ai-hint={heroBgOverlayImage.imageHint}
                />
              )}
              {heroMainImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <Image
                      src={heroMainImage.imageUrl}
                      alt={heroMainImage.description}
                      layout="fill"
                      className="object-cover rounded-full shadow-2xl"
                      data-ai-hint={heroMainImage.imageHint}
                    />
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4 text-white text-lg font-bold bg-black/30 p-2 rounded">
                58%
              </div>
              <div className="absolute top-1/4 right-4 text-white text-lg font-bold bg-black/30 p-2 rounded">
                36%
              </div>
              <div className="absolute bottom-4 right-1/4 text-white text-lg font-bold bg-black/30 p-2 rounded">
                73%
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Leaf className="h-10 w-10 text-primary" />
                <span className="text-2xl font-bold font-headline text-gray-700 tracking-wider">
                  SPROUTGROW AGENT
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">
                HELPING CROPS SPROUT, GROW, AND FLOURISH WITH SMART AI SUPPORT
              </h1>
              <p className="text-base text-muted-foreground">
                India's first voice-based AI farming assistant that brings
                expert guidance, crop care, and government schemes to your
                fingertips — even offline.
              </p>
              <p className="text-sm text-gray-500 italic">
                An AI Agent Grown with Care, For Farmers Who Grow the Nation
              </p>
              <div className="flex justify-center md:justify-end pt-4">
                {heroFarmersImage && (
                  <div className="relative w-64 h-40">
                    <Image
                      src={heroFarmersImage.imageUrl}
                      alt={heroFarmersImage.description}
                      layout="fill"
                      className="object-contain"
                      data-ai-hint={heroFarmersImage.imageHint}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Trusted AI Partner Section */}
        <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Features */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-headline text-primary">
                Your Trusted AI Partner in Every Season
              </h2>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mr-4 mt-1">
                      <ChevronRight className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side - Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative h-64 w-full">
                {trustedAgronomistImage && (
                  <Image
                    src={trustedAgronomistImage.imageUrl}
                    alt={trustedAgronomistImage.description}
                    layout="fill"
                    className="object-cover rounded-lg shadow-md"
                    data-ai-hint={trustedAgronomistImage.imageHint}
                  />
                )}
              </div>
              <div className="relative h-64 w-full">
                {trustedSeedlingImage && (
                  <Image
                    src={trustedSeedlingImage.imageUrl}
                    alt={trustedSeedlingImage.description}
                    layout="fill"
                    className="object-cover rounded-lg shadow-md"
                    data-ai-hint={trustedSeedlingImage.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
