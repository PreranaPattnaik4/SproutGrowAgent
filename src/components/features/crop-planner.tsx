'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CalendarCheck, ChevronsRight, Check } from 'lucide-react';
import {
  generateCropPlan,
  type GenerateCropPlanOutput,
} from '@/ai/flows/generate-crop-plan';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const FormSchema = z.object({
  crop: z.string().min(2, {
    message: 'Crop name must be at least 2 characters.',
  }),
});

type FormData = z.infer<typeof FormSchema>;

export function CropPlanner() {
  const [plan, setPlan] = useState<GenerateCropPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      crop: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setPlan(null);
    try {
      const result = await generateCropPlan({ crop: data.crop });
      setPlan(result);
    } catch (err) {
      console.error('Failed to generate crop plan:', err);
      setError('Could not generate the crop plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Enter the name of a crop to generate a personalized cultivation plan.
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
        <div className="flex-grow">
          <Input
            {...form.register('crop')}
            placeholder="e.g., Tomato, Wheat, Cotton"
            className="bg-background/50"
            disabled={isLoading}
          />
          {form.formState.errors.crop && (
            <p className="mt-1 text-xs text-destructive">
              {form.formState.errors.crop.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <CalendarCheck className="mr-2 h-4 w-4" />
              Generate Plan
            </>
          )}
        </Button>
      </form>

      {error && (
         <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
         </Alert>
      )}

      {plan && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">
              Crop Plan for {plan.cropName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {plan.plan.map((stage, index) => (
              <div key={index} className="rounded-lg border bg-muted/20 p-4">
                <h3 className="flex items-center font-semibold">
                  <ChevronsRight className="mr-2 h-5 w-5 text-primary" />
                  {stage.stage}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({stage.duration})
                  </span>
                </h3>
                <ul className="mt-2 ml-4 list-none space-y-1">
                  {stage.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start">
                        <Check className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                        <span className='text-muted-foreground'>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
