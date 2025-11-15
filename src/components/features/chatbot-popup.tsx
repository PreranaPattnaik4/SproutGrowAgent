'use client';

import { Leaf, MessageSquarePlus } from 'lucide-react';
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
      <DialogContent className="h-screen w-screen max-w-full max-h-full rounded-none border-0 bg-background/80 p-0 shadow-2xl backdrop-blur-xl">
        <div className="flex h-full flex-col">
          <DialogHeader className="flex flex-row items-center space-x-4 border-b border-border/50 p-4">
            <Leaf className="h-8 w-8 text-primary" />
            <DialogTitle className="font-headline text-2xl text-foreground">
              {t.appName}
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
