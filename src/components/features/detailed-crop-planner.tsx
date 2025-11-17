'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import {
  Upload,
  Loader2,
  Calendar as CalendarIcon,
  MapPin,
  Download,
  Share2,
  Sparkles,
  ListOrdered,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import {
  generateDetailedCropPlan,
  type GenerateDetailedCropPlanOutput,
} from '@/ai/flows/generate-detailed-crop-plan';

const FormSchema = z.object({
  location: z.string().min(2, 'Location is required.'),
  date: z.date({ required_error: 'A date is required.' }),
});

type FormData = z.infer<typeof FormSchema>;

const renderMarkdown = (markdown: string) => {
  if (!markdown) return null;
  const lines = markdown.split('\n');

  return (
    <ul className="space-y-1 list-none">
      {lines.map((line, index) => {
        const trimmedLine = line.replace(/^- /, '').trim();
        if (!trimmedLine) return null;
        
        // Handle bold text like **Land Preparation:**
        const parts = trimmedLine.split(/\*\*(.*?)\*\*/g);

        return (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1 text-primary">&#8226;</span>
            <span>
              {parts.map((part, i) =>
                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
};


export function DetailedCropPlanner() {
  const [soilImagePreview, setSoilImagePreview] = useState<string | null>(null);
  const [soilImageDataUri, setSoilImageDataUri] = useState<string | null>(null);
  const [plan, setPlan] = useState<GenerateDetailedCropPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setSoilImagePreview(URL.createObjectURL(file));
        setSoilImageDataUri(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setPlan(null);
    try {
      const result = await generateDetailedCropPlan({
        location: data.location,
        date: format(data.date, 'PPP'),
        soilImageUri: soilImageDataUri || undefined,
      });
      setPlan(result);
    } catch (err) {
      console.error('Failed to generate crop plan:', err);
      setError('Could not generate the crop plan. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPlan = () => {
    if (!plan) return;
    const content = `
Crop Recommendation:
${plan.recommendation}

Planting Plan:
${plan.plan}

Additional Tips:
${plan.tips}
    `;
    const blob = new Blob([content.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crop-plan.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareOnWhatsApp = () => {
    if (!plan) return;
    const shareText = `*SproutGrow Crop Plan*\n\n*Recommendation:*\n${plan.recommendation}\n\n*Planting Plan:*\n${plan.plan}\n\n*Tips:*\n${plan.tips}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">
            AI-Powered Crop Planner
          </CardTitle>
          <p className="text-muted-foreground pt-2">
            Provide details about your farm, and our AI will generate a
            customized crop plan to maximize your yield.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <label className="font-medium">Soil Image (Optional)</label>
                <div
                  className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 hover:bg-muted/75"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {soilImagePreview ? (
                    <Image
                      src={soilImagePreview}
                      alt="Soil preview"
                      width={400}
                      height={400}
                      className="h-full w-full rounded-md object-cover"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Upload className="mx-auto mb-2 h-8 w-8" />
                      <p>Click to upload an image</p>
                      <p className="text-xs">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="location" className="font-medium">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="location"
                      {...form.register('location')}
                      placeholder="e.g., Nagpur, Maharashtra"
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                  {form.formState.errors.location && (
                    <p className="text-xs text-destructive">{form.formState.errors.location.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                   <label htmlFor="date" className="font-medium">Planting Date</label>
                  <Controller
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                           <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={isLoading}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                           <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {form.formState.errors.date && (
                    <p className="text-xs text-destructive">{form.formState.errors.date.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                'Generate Crop Plan'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {plan && (
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline text-2xl">
              Your Personalized Crop Plan
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={downloadPlan}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                size="sm"
                onClick={shareOnWhatsApp}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border bg-muted/30 p-4">
              <h3 className="flex items-center gap-2 font-headline text-lg font-semibold text-primary">
                <Leaf /> Crop Recommendation
              </h3>
              <p className="mt-2 text-lg font-bold text-foreground">{plan.recommendation}</p>
            </div>

            <div className="space-y-2">
              <h3 className="flex items-center gap-2 font-headline text-lg font-semibold">
                <ListOrdered /> Planting Plan
              </h3>
              <div className="prose prose-sm max-w-none text-muted-foreground">{renderMarkdown(plan.plan)}</div>
            </div>

            <div className="space-y-2">
              <h3 className="flex items-center gap-2 font-headline text-lg font-semibold">
                <Sparkles /> Additional Tips
              </h3>
              <div className="prose prose-sm max-w-none text-muted-foreground">{renderMarkdown(plan.tips)}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
