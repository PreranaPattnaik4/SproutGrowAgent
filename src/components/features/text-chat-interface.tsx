'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Mic, ImageUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { answerTextQueryWithChatHistory } from '@/ai/flows/answer-text-query-with-chat-history';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

export function TextChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendMessage(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const handleSendMessage = async (
    text: string,
    imageDataUri: string | undefined = undefined
  ) => {
    if (!text.trim() && !imageDataUri) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      ...(imageDataUri && { image: imageDataUri }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const result = await answerTextQueryWithChatHistory({
        query: text,
        chatHistory: chatHistory.slice(0, -1),
        photoDataUri: imageDataUri,
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        handleSendMessage(
          input || 'What do you see in this image?',
          dataUri
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
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
                {message.image && (
                  <Image
                    src={message.image}
                    alt="User upload"
                    width={300}
                    height={200}
                    className="mb-2 rounded-md"
                  />
                )}
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
        <form
          onSubmit={handleFormSubmit}
          className="relative flex items-center gap-2"
        >
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            disabled={isLoading}
            onClick={() => imageInputRef.current?.click()}
            aria-label="Upload Image"
          >
            <ImageUp className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={isListening ? 'destructive' : 'ghost'}
            className="text-muted-foreground hover:text-foreground"
            disabled={isLoading}
            onClick={toggleListening}
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
            disabled={isLoading || (!input.trim() && messages.length === 0)}
            aria-label="Send Message"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
