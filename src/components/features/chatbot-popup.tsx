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
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-accent text-accent-foreground shadow-xl transition-transform duration-300 hover:scale-110 focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Open AI Chat"
        >
          <MessageSquarePlus className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] max-h-[700px] w-[95vw] max-w-[450px] rounded-lg border-primary/20 bg-background/90 p-0 shadow-2xl backdrop-blur-md sm:h-[80vh]">
        <div className="flex h-full flex-col">
          <DialogHeader className="border-b border-border/50 p-4">
            <DialogTitle className="font-headline text-foreground">
              {t.titleTextChat}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <TextChatInterface />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
