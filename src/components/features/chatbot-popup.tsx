'use client';

import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TextChatInterface } from './text-chat-interface';
import { useI18n } from '@/hooks/use-i18n';

export function ChatbotPopup() {
  const { t } = useI18n();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="animate-shine fixed bottom-6 right-6 h-16 w-16 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Open AI Chat"
        >
          <MessageSquarePlus className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[425px] md:max-w-lg">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="font-headline">{t.titleTextChat}</DialogTitle>
        </DialogHeader>
        <TextChatInterface />
      </DialogContent>
    </Dialog>
  );
}
