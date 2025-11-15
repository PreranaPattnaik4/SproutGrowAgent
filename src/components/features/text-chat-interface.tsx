'use client';

import { useState } from 'react';
import { Paperclip, Mic, ImageUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { answerTextQueryWithChatHistory } from '@/ai/flows/answer-text-query-with-chat-history';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function TextChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const result = await answerTextQueryWithChatHistory({
        query: input,
        chatHistory: chatHistory.slice(0, -1), // Send history before the current message
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: result.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling AI flow:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col max-h-[100vh] md:max-h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xs rounded-lg p-3 text-sm md:max-w-md lg:max-w-lg',
                  message.role === 'user'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'border border-primary/20 bg-card'
                )}
              >
                <p className="font-body">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
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
      <div className="border-t border-primary/10 bg-transparent p-4">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            disabled={isLoading}
            aria-label="Upload Image"
          >
            <ImageUp className="h-5 w-5" />
          </Button>
           <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            disabled={isLoading}
            aria-label="Use Microphone"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 pr-12 bg-background/50 border-primary/20 focus:ring-accent"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={isLoading || !input.trim()}
            aria-label="Send Message"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
