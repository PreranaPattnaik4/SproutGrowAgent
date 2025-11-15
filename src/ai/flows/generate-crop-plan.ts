'use server';
/**
 * @fileOverview Implements a Genkit flow for generating a crop plan.
 *
 * - generateCropPlan - A function that generates a crop plan based on user input.
 * - GenerateCropPlanInput - The input type for the generateCropPlan function.
 * - GenerateCropPlanOutput - The return type for the generateCropPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCropPlanInputSchema = z.object({
  crop: z.string().describe('The type of crop the user wants to plant.'),
});
export type GenerateCropPlanInput = z.infer<typeof GenerateCropPlanInputSchema>;

const CropStageSchema = z.object({
  stage: z.string().describe('Name of the crop stage (e.g., Sowing, Vegetative Growth).'),
  duration: z.string().describe('The approximate duration of this stage.'),
  tasks: z.array(z.string()).describe('A list of tasks to be performed during this stage.'),
});

const GenerateCropPlanOutputSchema = z.object({
  cropName: z.string().describe('The name of the crop for the plan.'),
  plan: z.array(CropStageSchema).describe('A list of stages and tasks for the crop plan.'),
});
export type GenerateCropPlanOutput = z.infer<typeof GenerateCropPlanOutputSchema>;

export async function generateCropPlan(input: GenerateCropPlanInput): Promise<GenerateCropPlanOutput> {
  return generateCropPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCropPlanPrompt',
  input: {schema: GenerateCropPlanInputSchema},
  output: {schema: GenerateCropPlanOutputSchema},
  prompt: `You are an expert agronomist. A farmer wants a crop plan for "{{crop}}".

Generate a simplified, stage-by-stage crop plan. For each stage, provide a name, an approximate duration, and a list of key tasks. The plan should be easy for a farmer to understand and follow.

Provide the output for the crop: {{crop}}.`,
});

const generateCropPlanFlow = ai.defineFlow(
  {
    name: 'generateCropPlanFlow',
    inputSchema: GenerateCropPlanInputSchema,
    outputSchema: GenerateCropPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
