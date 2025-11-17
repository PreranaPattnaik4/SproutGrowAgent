'use server';
/**
 * @fileOverview The main coordinator flow for the SproutGrow Agent.
 * This flow is responsible for analyzing user queries and routing them to the appropriate specialized agent.
 *
 * - coordinateUserQuery - A function that handles the query coordination.
 * - CoordinateUserQueryInput - The input type for the coordinateUserQuery function.
 * - CoordinateUserQueryOutput - The return type for the coordinateUserQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CoordinateUserQueryInputSchema = z.object({
  query: z.string().describe('The user\'s request, which could be text, a question about an image, or a voice command.'),
});
export type CoordinateUserQueryInput = z.infer<typeof CoordinateUserQueryInputSchema>;

const CoordinateUserQueryOutputSchema = z.object({
  agent: z.enum(['vision', 'text', 'location', 'weather', 'mandi_price', 'schemes', 'unknown']).describe('The specialized agent determined to be the best fit for the query.'),
  forwardedQuery: z.string().describe('The query to forward to the specialized agent.'),
});
export type CoordinateUserQueryOutput = z.infer<typeof CoordinateUserQueryOutputSchema>;


export async function coordinateUserQuery(input: CoordinateUserQueryInput): Promise<CoordinateUserQueryOutput> {
  return coordinatorFlow(input);
}

const coordinatorPrompt = ai.definePrompt({
  name: 'coordinatorPrompt',
  input: {schema: CoordinateUserQueryInputSchema},
  output: {schema: CoordinateUserQueryOutputSchema},
  prompt: `You are the central coordinator for the SproutGrow AI farming assistant. Your job is to analyze the user's query and determine which specialized agent is best suited to handle it.

You have the following agents available:
- 'vision': For analyzing images of plants to diagnose diseases. Use this if the query mentions an image, a photo, or visual symptoms.
- 'text': For general, conversational questions about farming, crops, and agricultural practices. This is the default agent for conversational chat.
- 'location': For queries about region-specific advice, like best crops for a district.
- 'weather': For providing farming advice based on weather conditions.
- 'mandi_price': For fetching market prices of crops in a specific location.
- 'schemes': For finding information about government agricultural schemes.
- 'unknown': If the query does not fit any of the above categories.

Analyze the user's query and determine the appropriate agent.

User Query: "{{query}}"`,
});


const coordinatorFlow = ai.defineFlow(
  {
    name: 'coordinatorFlow',
    inputSchema: CoordinateUserQueryInputSchema,
    outputSchema: CoordinateUserQueryOutputSchema,
  },
  async (input) => {
    const { output } = await coordinatorPrompt(input);

    if (!output) {
        return {
            agent: 'unknown',
            forwardedQuery: input.query,
        };
    }
    
    return {
        agent: output.agent,
        forwardedQuery: input.query, // For now, we just forward the original query
    };
  }
);
