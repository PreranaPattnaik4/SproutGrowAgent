'use client';

import { useState } from 'react';
import {
  Bot,
  Loader2,
  Mic,
  Send,
  User,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        role: 'assistant',
        content: `This is a placeholder response to: "${userMessage.content}"`,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
      <span className="font-headline text-lg font-bold tracking-tight text-foreground">
        <span style={{ color: '#8ca89b' }}>Sprout</span>
        <span style={{ color: '#4d423d' }}>Grow</span>
      </span>
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-200 text-xs font-bold"
        style={{ color: '#4d423d' }}
      >
        Agent
      </span>
    </Link>
  );

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 h-[70vh] w-[90vw] max-w-lg sm:rounded-lg bg-card/80 backdrop-blur-xl border border-primary/20 shadow-2xl flex flex-col">
          <div className="p-4 border-b border-primary/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <Logo />
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
          </div>
          <div className="flex h-full flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center text-muted-foreground pt-12">
                    <Bot className="mb-4 h-12 w-12" />
                    <h3 className="font-semibold text-lg">Welcome!</h3>
                    <p className="text-sm">How can I help you today?</p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-start gap-3',
                        message.role === 'user'
                          ? 'justify-end'
                          : 'justify-start'
                      )}
                    >
                      {message.role === 'assistant' && (
                         <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          'max-w-xs rounded-lg p-3 text-sm md:max-w-sm',
                          message.role === 'user'
                            ? 'bg-secondary text-secondary-foreground'
                            : 'border border-primary/20 bg-card'
                        )}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                       {message.role === 'user' && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))
                )}
                 {isLoading && (
                    <div className="flex items-start justify-start gap-3">
                        <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                        <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center rounded-lg bg-muted p-3 text-sm">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
            <div className="border-t border-primary/10 p-4">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-background/50"
                  disabled={isLoading}
                />
                <Button type="button" size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button type="submit" size="icon" variant="default" disabled={isLoading || !input.trim()}>
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-24 h-20 animate-float cursor-pointer group"
          aria-label="Open Chat"
        >
          <div className="absolute top-0 right-4 w-16 h-16 bg-background rounded-full transition-transform duration-300 ease-in-out group-hover:scale-110 shadow-lg"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-background rounded-full transition-transform duration-300 ease-in-out group-hover:scale-110 shadow-md"></div>
          <div className="absolute top-4 left-0 w-14 h-14 bg-background rounded-full transition-transform duration-300 ease-in-out group-hover:scale-110 shadow-md"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Bot className="h-8 w-8 text-primary transition-transform duration-300 ease-in-out group-hover:scale-125" />
          </div>
        </button>
      )}
    </>
  );
}
