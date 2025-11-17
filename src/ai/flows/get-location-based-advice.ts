'use server';
/**
 * @fileOverview Implements a Genkit flow for providing localized agricultural advice.
 *
 * - getLocationBasedAdvice - A function that provides advice based on a location.
 * - GetLocationBasedAdviceInput - The input type for the function.
 * - GetLocationBasedAdviceOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GetLocationBasedAdviceInputSchema = z.object({
  location: z.string().describe('The district or state for which to provide agricultural advice.'),
});
export type GetLocationBasedAdviceInput = z.infer<typeof GetLocationBasedAdviceInputSchema>;

export const GetLocationBasedAdviceOutputSchema = z.object({
  advice: z.string().describe('Localized advice on crop suitability, regional practices, and seasonal information.'),
});
export type GetLocationBasedAdviceOutput = z.infer<typeof GetLocationBasedAdviceOutputSchema>;

export async function getLocationBasedAdvice(input: GetLocationBasedAdviceInput): Promise<GetLocationBasedAdviceOutput> {
  return locationAgentFlow(input);
}

const locationAgentPrompt = ai.definePrompt({
  name: 'locationAgentPrompt',
  input: {schema: GetLocationBasedAdviceInputSchema},
  output: {schema: GetLocationBasedAdviceOutputSchema},
  prompt: `You are SproutGrow Local Info, an expert in regional agricultural information. Your purpose is to provide highly localized advice and data based on a specified district or state. You will focus on region-specific farming practices, crop suitability, and local agricultural insights.

Core Principles:

- Location-Specific: All information provided must be relevant to the user's specified district or state.
- Practical and Actionable: Offer advice that considers local climate, soil types, and common regional crops.
- Data-Driven (Simulated): Formulate responses as if drawing from a comprehensive database of regional agricultural knowledge.

Capabilities & Response Guidelines:

- Crop Suitability: Advise on which crops are most suitable for cultivation in a given district/state, considering climate and soil.
- Regional Practices: Provide insights into common or recommended farming practices specific to the area.
- Seasonal Advice: Offer seasonal planting or harvesting advice tailored to the region.
- Disease/Pest Prevalence: Mention common diseases or pests prevalent in the specified location.
- Climate & Soil: Briefly touch upon the general climate and soil characteristics of the district/state if relevant to the advice.

User Query (Location): {{location}}
`,
});

const locationAgentFlow = ai.defineFlow(
  {
    name: 'locationAgentFlow',
    inputSchema: GetLocationBasedAdviceInputSchema,
    outputSchema: GetLocationBasedAdviceOutputSchema,
  },
  async (input) => {
    const { output } = await locationAgentPrompt(input);
    return output!;
  }
);
