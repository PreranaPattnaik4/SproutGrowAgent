import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqs = [
  {
    question: 'How do I use the Image Diagnosis feature?',
    answer:
      'Simply navigate to the "Image Diagnosis" page, upload a clear photo of an affected plant leaf, and our AI will provide a potential diagnosis and treatment advice.',
  },
  {
    question: 'How does the AI Assistant work?',
    answer:
      'The AI Assistant is a conversational tool. You can type a question, use your voice, or upload an image. The assistant uses this information to provide contextual answers to your farming questions.',
  },
  {
    question: 'Is the market price data real-time?',
    answer:
      'Currently, the market prices displayed in the app are simulated for demonstration purposes. For official and live rates, please consult your local market authorities.',
  },
  {
    question: 'How accurate is the crop planner?',
    answer:
      'The Crop Planner provides recommendations based on AI analysis of the data you provide (location, date, soil image). While it is a powerful tool for guidance, local conditions can vary. We recommend using it as a starting point and combining it with your local expertise.',
  },
];

export default function HelpPage() {
  return (
    <main className="container mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Help & FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="mb-2 rounded-lg border bg-card shadow-sm"
              >
                <AccordionTrigger className="p-6 text-left font-headline text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0 text-base text-muted-foreground">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </main>
  );
}
