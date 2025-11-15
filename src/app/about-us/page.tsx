'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Handshake,
  Lightbulb,
  ShieldCheck,
  CircleUserRound,
  CheckCircle,
} from 'lucide-react';

const aboutContent = [
  {
    value: 'trust',
    title: 'Cultivating Trust',
    Icon: Handshake,
    principles: [
      {
        title: 'Mutual Respect',
        description:
          'We believe in the power of mutual respect to maintain honest, transparent, and meaningful relationships with our farming community and stakeholders.',
      },
      {
        title: 'Integrity & Accountability',
        description:
          'We practice integrity, drive accountability, and ownership to achieve our common goals and maximize employee potential.',
      },
      {
        title: 'Inclusive Growth',
        description:
          'We embrace diversity across cultural background, race, religion, caste, gender, opinions, & views as the core of our culture, ensuring growth for all.',
      },
    ],
  },
  {
    value: 'innovation',
    title: 'Nurturing Innovation',
    Icon: Lightbulb,
    principles: [
      {
        title: 'Collaborative Spirit',
        description:
          'We foster collaboration & teamwork across functions to fulfill a common goal of enhancing & amplifying the mission behind SproutGrow Agent: Passion for Problem-Solving.',
      },
      {
        title: 'Problem-Solving Passion',
        description:
          'We nurture creative ideas to generate solutions for our customers and raise the bar, both within our workplace & throughout the industry.',
      },
      {
        title: 'Challenge & Improve',
        description:
          'We strive to stretch boundaries, question conventions & have the courage and curiosity to take bold steps, think big and take calculated risks for continuous improvement.',
      },
    ],
  },
  {
    value: 'empowerment',
    title: 'Farmer Empowerment',
    Icon: CircleUserRound,
    principles: [
      {
        title: 'Relentless Focus on Needs',
        description:
          'We focus on understanding the needs of our farmers & creating solutions that improve their income & quality of life.',
      },
      {
        title: 'Empowerment is Paramount',
        description:
          'We put empowerment of our farmers at the core of our approach, technological interventions & product developments.',
      },
      {
        title: 'Go Above & Beyond',
        description:
          'We ideate, innovate & think from the perspectives of our farmers and work dedicatedly to create simple & great solutions for them.',
      },
    ],
  },
];

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-8 text-center font-headline text-3xl font-bold text-foreground">
            About SproutGrow Agent
          </h1>

          <Tabs defaultValue="trust" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1">
              {aboutContent.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {aboutContent.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-6">
                <div className="grid grid-cols-1 items-center gap-8 rounded-lg border bg-card p-6 shadow-sm md:grid-cols-3">
                  <div className="flex justify-center md:col-span-1">
                    <tab.Icon className="h-32 w-32 text-accent" />
                  </div>
                  <div className="md:col-span-2">
                    <h2 className="mb-4 font-headline text-2xl font-bold text-foreground">
                      {tab.title}
                    </h2>
                    <ul className="space-y-4">
                      {tab.principles.map((principle) => (
                        <li
                          key={principle.title}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                          <div>
                            <h3 className="font-semibold">{principle.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {principle.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
