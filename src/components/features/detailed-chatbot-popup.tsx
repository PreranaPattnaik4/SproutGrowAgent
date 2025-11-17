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
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  location: z.string().min(2, 'Location is required.'),
  date: z.date({ required_error: 'A date is required.' }),
});

type FormData = z.infer<typeof FormSchema>;

interface CropPlannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DetailedChatbotPopup({
  open,
  onOpenChange,
}: CropPlannerDialogProps) {
  const [soilImagePreview, setSoilImagePreview] = useState<string | null>(null);
  const [soilImageDataUri, setSoilImageDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

    try {
      // We don't call the AI here anymore. We navigate.
      const queryParams = new URLSearchParams({
        location: data.location,
        date: data.date.toISOString(),
      });
      if (soilImageDataUri) {
        // Since data URIs can be long, we can't pass it directly.
        // We'll store it in session storage for the next page to pick up.
        sessionStorage.setItem('crop-planner-image', soilImageDataUri);
      } else {
        sessionStorage.removeItem('crop-planner-image');
      }

      router.push(`/ai-assistant?${queryParams.toString()}`);
      onOpenChange(false); // Close the dialog on successful submission
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Failed to navigate. Please try again.');
      setIsLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset form on close
      form.reset();
      setSoilImagePreview(null);
      setSoilImageDataUri(null);
      setError(null);
      setIsLoading(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            AI-Powered Crop Planner
          </DialogTitle>
          <p className="pt-2 text-muted-foreground">
            Provide details about your farm to get a customized crop plan in the
            AI Assistant.
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="font-medium">Soil Image (Optional)</label>
              <div
                className="relative flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 transition-colors hover:bg-muted/75"
                onClick={() => fileInputRef.current?.click()}
              >
                {soilImagePreview ? (
                  <>
                    <Image
                      src={soilImagePreview}
                      alt="Soil preview"
                      fill
                      className="rounded-md object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-1 top-1 h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSoilImagePreview(null);
                        setSoilImageDataUri(null);
                        if(fileInputRef.current) fileInputRef.current.value = "";
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Upload className="mx-auto h-8 w-8" />
                    <p className="mt-2 text-sm">Click to upload image</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="location" className="font-medium">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location"
                    {...form.register('location')}
                    placeholder="e.g., Bengaluru, Karnataka"
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
                {form.formState.errors.location && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.location.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="font-medium">
                  Planting Date
                </label>
                <Controller
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                          disabled={isLoading}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
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
                  <p className="text-xs text-destructive">
                    {form.formState.errors.date.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Get Crop Plan'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
