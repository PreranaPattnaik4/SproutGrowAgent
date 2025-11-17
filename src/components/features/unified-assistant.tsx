'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ArrowUp,
  Mic,
  ImageUp,
  Loader2,
  Bot,
  User,
  Download,
  Share2,
  MicOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  answerTextQueryWithChatHistory,
  type AnswerTextQueryWithChatHistoryInput,
} from '@/ai/flows/answer-text-query-with-chat-history';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

export function UnifiedAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [wasVoiceInput, setWasVoiceInput] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [location, setLocation] = useState<string | undefined>(undefined);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setWasVoiceInput(true);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript); // Set the input field with the transcript
        handleSendMessage({ text: transcript }); // Automatically send the message
      };
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          `${position.coords.latitude}, ${position.coords.longitude}`
        );
      },
      () => setLocation(undefined)
    );
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [input]);

  const handleSendMessage = async ({
    text,
    imageDataUri,
  }: {
    text: string;
    imageDataUri?: string;
  }) => {
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

      const inputPayload: AnswerTextQueryWithChatHistoryInput = {
        query: text,
        chatHistory: chatHistory.slice(0, -1),
        ...(imageDataUri && { photoDataUri: imageDataUri }),
      };

      const result = await answerTextQueryWithChatHistory(inputPayload);

      const assistantMessage: Message = {
        role: 'assistant',
        content: result.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (wasVoiceInput) {
        const utterance = new SpeechSynthesisUtterance(result.response);
        window.speechSynthesis.speak(utterance);
        setWasVoiceInput(false); // Reset after speaking
      }
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
    setWasVoiceInput(false); // It's a text submission
    handleSendMessage({ text: input });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e as any);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setWasVoiceInput(false); // Image submission is not voice
        handleSendMessage({
          text: input || 'What do you see in this image?',
          imageDataUri: dataUri,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setInput(''); // Clear input before listening
      recognitionRef.current.start();
    }
  };

  const downloadConversation = () => {
    const conversationText = messages
      .map(
        (m) =>
          `${m.role === 'user' ? 'You' : 'AI Assistant'}:\n${m.content}\n\n`
      )
      .join('');
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'conversation.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareOnWhatsApp = () => {
    const lastMessage = messages.findLast((m) => m.role === 'assistant');
    if (lastMessage) {
      const shareText = `*SproutGrow Agent Advice:*\n\n${lastMessage.content}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        shareText
      )}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <Card className="mx-auto flex h-full max-w-4xl flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-headline">
          AI Assistant
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={downloadConversation}
              disabled={messages.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareOnWhatsApp}
              disabled={!messages.some((m) => m.role === 'assistant')}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
                <Bot className="mb-4 h-16 w-16" />
                <p>
                  Welcome to your AI Assistant.
                  <br />
                  You can type, talk, or upload an image to start.
                </p>
              </div>
            )}
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
                  <p className="font-body whitespace-pre-wrap">
                    {message.content}
                  </p>
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
          {!isSpeechSupported && !isListening && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Browser Not Supported</AlertTitle>
              <AlertDescription>
                Your browser does not support voice recognition. Please try
                typing.
              </AlertDescription>
            </Alert>
          )}
          <form
            onSubmit={handleFormSubmit}
            className="relative flex items-start gap-2"
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
              className="flex-shrink-0 text-muted-foreground hover:text-foreground"
              disabled={isLoading}
              onClick={() => imageInputRef.current?.click()}
              aria-label="Upload Image"
            >
              <ImageUp className="h-5 w-5" />
            </Button>
            {isSpeechSupported && (
              <Button
                type="button"
                size="icon"
                variant={isListening ? 'destructive' : 'ghost'}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                disabled={isLoading}
                onClick={toggleListening}
                aria-label="Use Microphone"
              >
                {isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>
            )}
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening..." : "Ask a question or describe your issue..."}
              className="flex-1 resize-none overflow-hidden pr-12 bg-background/50 border-primary/20 focus:ring-accent min-h-[40px] max-h-[200px]"
              rows={1}
              disabled={isLoading || isListening}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-3 bottom-2 h-8 w-8 bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={isLoading || (!input.trim() && messages.length === 0)}
              aria-label="Send Message"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
