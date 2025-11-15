'use client';

import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TextChatInterface } from './text-chat-interface';
import { useI18n } from '@/hooks/use-i18n';

export function ChatbotPopup() {
  const { t } = useI18n();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-accent text-accent-foreground shadow-xl transition-transform duration-300 hover:scale-110 focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Open AI Chat"
        >
          <MessageSquare className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-none border-0 bg-background/20 p-0 shadow-2xl backdrop-blur-xl sm:max-w-none md:w-1/2"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="flex flex-row items-center space-x-4 border-b border-border/50 p-4">
            <div className="flex items-baseline">
              <span className="font-logo-wander text-2xl font-normal text-primary">
                Wander
              </span>
              <span className="font-logo-wise text-2xl font-bold text-accent">
                Wise
              </span>
              <div className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                <span className="font-logo-wise text-xs font-bold text-accent">
                  AI
                </span>
              </div>
            </div>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            <TextChatInterface />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
