import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Header } from '@/components/layout/header';
import {
  FlaskConical,
  Tags,
  CalendarDays,
  CloudSun,
  Package,
  Users,
  ShieldCheck,
  Landmark,
} from 'lucide-react';

const digitalSolutions = [
  {
    title: 'Soil Testing',
    icon: FlaskConical,
    description: 'Get detailed analysis of your soil health.',
  },
  {
    title: 'Farm Tagging',
    icon: Tags,
    description: 'Digitally map and manage your farm plots.',
  },
  {
    title: 'Crop Planner',
    icon: CalendarDays,
    description: 'Plan your crops efficiently with personalized recommendations.',
  },
  {
    title: 'Weather Alerts',
    icon: CloudSun,
    description: 'Receive timely weather forecasts and alerts specific to your farm.',
  },
  {
    title: 'Access to Quality Input',
    icon: Package,
    description: 'Find reliable sources for seeds, fertilizers, and other farm inputs.',
  },
  {
    title: 'Connect with Experts',
    icon: Users,
    description: 'Get advice from agricultural specialists and researchers.',
  },
  {
    title: 'Crop Insurance',
    icon: ShieldCheck,
    description:
      'Easy to avail and accessible policies at low-cost premium, provides a safety net for farmers in case of crop damage caused by natural calamities.',
  },
  {
    title: 'Mandi rate and Market Linkage (Sell Produces)',
    icon: Landmark,
    description:
      'Access real-time Mandi rates and connect directly with buyers to sell your produce efficiently.',
  },
];

export default function DigitalSolutionsPage() {
  return (
    <div className="flex flex-col">
      <Header title="Digital Solutions" />
      <main className="p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center font-headline text-3xl font-bold text-foreground">
            Digital Solution For Farmers
          </h1>
          <Accordion type="single" collapsible className="w-full">
            {digitalSolutions.map((solution, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-0 rounded-lg mb-2 bg-card shadow-sm">
                <AccordionTrigger className="font-headline text-lg hover:no-underline p-6">
                  <div className="flex items-center gap-4">
                    <solution.icon className="h-6 w-6 text-primary" />
                    <span>{solution.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0 text-base text-muted-foreground">
                  {solution.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
}
