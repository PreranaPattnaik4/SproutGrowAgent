'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Loader2, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { answerTextQueryWithChatHistory } from '@/ai/flows/answer-text-query-with-chat-history';
import { useI18n } from '@/hooks/use-i18n';

export function ImageDiagnosisForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();

  const defaultImage = 'https://picsum.photos/seed/plant-leaf/600/400';

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        setDiagnosis(null);
        setError(null);
        setIsLoading(true);
        try {
          const result = await answerTextQueryWithChatHistory({
            query: 'Diagnose the disease in this plant leaf image.',
            photoDataUri: dataUri,
            chatHistory: [],
          });
          setDiagnosis(result.response);
        } catch (err) {
          setError('Failed to get diagnosis. Please try again.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            {t.imageUploadTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{t.imageUploadDesc}</p>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 sm:w-1/2">
              <Image
                src={imagePreview || defaultImage}
                alt="Plant leaf"
                width={600}
                height={400}
                className="max-h-full max-w-full rounded-md object-contain"
                data-ai-hint="plant leaf"
              />
            </div>
            <div className="w-full space-y-4 sm:w-1/2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                onClick={handleButtonClick}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                {isLoading ? t.imageUploading : t.imageUploadButton}
              </Button>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {(isLoading || diagnosis) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Microscope /> {t.imageDiagnosisResult}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && !diagnosis ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Analyzing... please wait.</p>
              </div>
            ) : (
              <p className="font-body whitespace-pre-wrap">{diagnosis}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

    