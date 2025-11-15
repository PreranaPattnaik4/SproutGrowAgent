'use client';

import { MessageSquare, Leaf } from 'lucide-react';
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
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-300 hover:scale-110 focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
            <div className="flex items-center gap-2">
              <Leaf className="h-7 w-7 text-primary" />
              <div className="flex flex-col">
                <span className="font-headline text-xl font-bold tracking-tight text-foreground">
                  SproutGrow Agent
                </span>
                <span className="text-xs text-muted-foreground">
                  AI Farming Companion
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
