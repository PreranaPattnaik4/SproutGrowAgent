'use server';
/**
 * @fileOverview Implements a Genkit flow for generating a detailed crop plan.
 *
 * - generateDetailedCropPlan - A function that generates a crop plan based on user input.
 * - GenerateDetailedCropPlanInput - The input type for the generateDetailedCropPlan function.
 * - GenerateDetailedCropPlanOutput - The return type for the generateDetailedCropPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateDetailedCropPlanInputSchema = z.object({
  soilImageUri: z.string().optional().describe(
      "A photo of the soil, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  location: z.string().describe('The location (e.g., district, state) for planting.'),
  date: z.string().describe('The planned date for sowing/planting.'),
});
export type GenerateDetailedCropPlanInput = z.infer<typeof GenerateDetailedCropPlanInputSchema>;

export const GenerateDetailedCropPlanOutputSchema = z.object({
    recommendation: z.string().describe("The primary crop recommended for the given conditions."),
    plan: z.string().describe("A concise, step-by-step plan for cultivating the recommended crop in Markdown format."),
    tips: z.string().describe("Additional tips for maximizing yield and ensuring a healthy crop in Markdown format."),
});
export type GenerateDetailedCropPlanOutput = z.infer<typeof GenerateDetailedCropPlanOutputSchema>;

export async function generateDetailedCropPlan(input: GenerateDetailedCropPlanInput): Promise<GenerateDetailedCropPlanOutput> {
  return generateDetailedCropPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDetailedCropPlanPrompt',
  input: {schema: GenerateDetailedCropPlanInputSchema},
  output: {schema: GenerateDetailedCropPlanOutputSchema},
  prompt: `You are an expert agronomist providing a crop recommendation and plan. Analyze the following inputs to generate a detailed guide.

Inputs:
- Location: {{location}}
- Sowing Date: {{date}}
{{#if soilImageUri}}
- Soil Image: {{media url=soilImageUri}}
  (Analyze the image to infer soil type, texture, and potential quality. If the image is unclear, make a reasonable assumption based on the location.)
{{/if}}

Task:
1.  **Crop Recommendation:** Based on the location's typical climate, the sowing date (season), and the soil analysis from the image, recommend the single most suitable crop.
2.  **Planting Plan:** Provide a clear, step-by-step cultivation plan for the recommended crop. Format this as a Markdown list. Include key stages like land preparation, sowing, irrigation, fertilization, and harvesting.
3.  **Additional Tips:** Provide a separate list of actionable tips in Markdown for a successful harvest. Include advice on pest control, soil health, and any other relevant best practices.

Generate the response.`,
});

const generateDetailedCropPlanFlow = ai.defineFlow(
  {
    name: 'generateDetailedCropPlanFlow',
    inputSchema: GenerateDetailedCropPlanInputSchema,
    outputSchema: GenerateDetailedCropPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
