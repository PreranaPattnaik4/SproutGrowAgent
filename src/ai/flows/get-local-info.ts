'use server';
/**
 * @fileOverview Implements a Genkit flow for providing localized agricultural advice.
 *
 * - getLocalInfo - A function that provides advice based on a location for various topics.
 * - GetLocalInfoInput - The input type for the function.
 * - GetLocalInfoOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GetLocalInfoInputSchema = z.object({
  location: z.string().describe('The district or state for which to provide agricultural advice.'),
  query: z.string().describe('The user query, specifying what kind of information is needed (e.g., weather, prices, schemes, crops).'),
});
export type GetLocalInfoInput = z.infer<typeof GetLocalInfoInputSchema>;

export const GetLocalInfoOutputSchema = z.object({
  response: z.string().describe('Localized information about the requested topic.'),
});
export type GetLocalInfoOutput = z.infer<typeof GetLocalInfoOutputSchema>;

export async function getLocalInfo(input: GetLocalInfoInput): Promise<GetLocalInfoOutput> {
  return localInfoAgentFlow(input);
}

const localInfoAgentPrompt = ai.definePrompt({
  name: 'localInfoAgentPrompt',
  input: {schema: GetLocalInfoInputSchema},
  output: {schema: GetLocalInfoOutputSchema},
  prompt: `You are SproutGrow Local Info, an expert in regional agricultural information. Your purpose is to provide highly localized advice and data based on a specified location and query. You can handle questions about crop suitability, weather advisories, simulated market prices, and government schemes.

Core Principles:

- Location-Specific: All information provided must be relevant to the user's specified location.
- Topic-Specific: Address the user's specific query (weather, prices, schemes, or crops).
- Practical and Actionable: Offer advice that is practical.
- Data-Driven (Simulated): Formulate responses as if drawing from a comprehensive database. For prices and schemes, clearly state that the data is for demonstration purposes.

Capabilities & Response Guidelines:

1. Crop Suitability: Advise on which crops are most suitable for cultivation in a given district/state.
   - User Query Example: "What crops grow well in Nagpur?"

2. Weather Advisory: Interpret a weather condition described by the user and provide actionable farming advice.
   - User Query Example: "What should I do if heavy rain is forecast for my region?"

3. Mandi Price (Simulated): Provide simulated market prices for a crop in a location.
   - User Query Example: "What is the price of wheat in Ludhiana?"
   - Your Response: Must include a disclaimer like "Please note, these are simulated prices for demonstration."

4. Government Schemes (Simulated): List relevant government schemes for a location.
   - User Query Example: "What government schemes are there in Ahmednagar?"
   - Your Response: Must include a disclaimer like "For official details, always refer to government portals."

Analyze the user's query to understand the topic, then provide a response based on the specified location.

Location: {{location}}
User Query: "{{query}}"
`,
});

const localInfoAgentFlow = ai.defineFlow(
  {
    name: 'localInfoAgentFlow',
    inputSchema: GetLocalInfoInputSchema,
    outputSchema: GetLocalInfoOutputSchema,
  },
  async (input) => {
    const { output } = await localInfoAgentPrompt(input);
    return { response: output!.response };
  }
);
