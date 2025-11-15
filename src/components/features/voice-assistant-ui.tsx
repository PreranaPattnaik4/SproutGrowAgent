'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Bot, User, Loader2, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { answerVoiceQueryWithIntegratedInfo } from '@/ai/flows/answer-voice-query-with-integrated-info';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

type ConversationTurn = {
  speaker: 'USER' | 'AI';
  text: string;
};

export function VoiceAssistantUI() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check for SpeechRecognition API on client mount
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const userTurn: ConversationTurn = { speaker: 'USER', text: transcript };
        setConversation((prev) => [...prev, userTurn]);
        setIsLoading(true);

        // Use a function to get the latest conversation state
        setConversation((currentConversation) => {
          answerVoiceQueryWithIntegratedInfo({
            query: transcript,
            location,
            chatHistory: currentConversation,
          })
            .then((response) => {
              const aiTurn: ConversationTurn = {
                speaker: 'AI',
                text: response.advice,
              };
              setConversation((prev) => [...prev, aiTurn]);
              speak(response.advice);
            })
            .catch((error) => {
              console.error('AI Error:', error);
              const errorTurn: ConversationTurn = {
                speaker: 'AI',
                text: "I'm sorry, I couldn't process that.",
              };
              setConversation((prev) => [...prev, errorTurn]);
              speak(errorTurn.text);
            })
            .finally(() => setIsLoading(false));
          return currentConversation;
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }

    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          `${position.coords.latitude}, ${position.coords.longitude}`
        );
      },
      () => {
        setLocation(undefined);
      }
    );
  }, [location]);

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  if (!isSupported) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Browser Not Supported</AlertTitle>
        <AlertDescription>
          Your browser does not support the Web Speech API. Please try Chrome or
          another supported browser.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mx-auto max-w-3xl text-center">
      <Card>
        <CardContent className="space-y-6 p-6">
          <Button
            onClick={toggleListening}
            size="lg"
            className={cn(
              'h-24 w-24 rounded-full transition-all duration-300',
              isListening ? 'bg-destructive' : 'bg-primary',
              isLoading && 'cursor-not-allowed'
            )}
            disabled={isLoading}
          >
            {isListening ? (
              <MicOff className="h-10 w-10" />
            ) : (
              <Mic className="h-10 w-10" />
            )}
          </Button>
          <p className="text-muted-foreground">
            {isLoading
              ? 'Thinking...'
              : isListening
              ? 'Listening...'
              : 'Tap the mic to start speaking'}
          </p>
          <ScrollArea className="h-96 w-full rounded-md border bg-muted/50 p-4 text-left">
            <div className="space-y-4">
              {conversation.map((turn, index) => (
                <div key={index} className="flex items-start gap-3">
                  {turn.speaker === 'AI' ? (
                    <Bot className="h-6 w-6 flex-shrink-0 text-primary" />
                  ) : (
                    <User className="h-6 w-6 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="pt-0.5">{turn.text}</p>
                  </div>
                  {turn.speaker === 'AI' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => speak(turn.text)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <Bot className="h-6 w-6 flex-shrink-0 text-primary" />
                  <Loader2 className="mt-0.5 h-5 w-5 animate-spin" />
                </div>
              )}
              {conversation.length === 0 && !isLoading && (
                <p className="text-center text-muted-foreground">
                  Your conversation will appear here.
                </p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
