'use server';
/**
 * @fileOverview Implements a Genkit flow for answering text-based queries with chat history.
 *
 * - answerTextQueryWithChatHistory - A function that answers the text query using the chat history.
 * - AnswerTextQueryWithChatHistoryInput - The input type for the answerTextQueryWithChatHistory function.
 * - AnswerTextQueryWithChatHistoryOutput - The return type for the answerTextQueryWithChatHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerTextQueryWithChatHistoryInputSchema = z.object({
  query: z.string().describe('The text query from the user.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of a plant leaf, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  chatHistory: z.array(z.object({role: z.enum(['user', 'assistant']), content: z.string()})).describe('The history of the chat between the user and the assistant.'),
});
export type AnswerTextQueryWithChatHistoryInput = z.infer<typeof AnswerTextQueryWithChatHistoryInputSchema>;

const AnswerTextQueryWithChatHistoryOutputSchema = z.object({
  response: z.string().describe('The response to the user query, incorporating the chat history.'),
});
export type AnswerTextQueryWithChatHistoryOutput = z.infer<typeof AnswerTextQueryWithChatHistoryOutputSchema>;

export async function answerTextQueryWithChatHistory(input: AnswerTextQueryWithChatHistoryInput): Promise<AnswerTextQueryWithChatHistoryOutput> {
  return answerTextQueryWithChatHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerTextQueryWithChatHistoryPrompt',
  input: {schema: AnswerTextQueryWithChatHistoryInputSchema},
  output: {schema: AnswerTextQueryWithChatHistoryOutputSchema},
  prompt: `You are a helpful AI assistant for farmers. You can analyze images and text.

You will be provided with a query from the user and the history of the chat. You must use the chat history to provide a relevant response.

Chat History:
{{#each chatHistory}}
  {{role}}: {{content}}
{{/each}}

User Query: {{query}}

{{#if photoDataUri}}
Image: {{media url=photoDataUri}}
{{/if}}

Response: `,
});

const answerTextQueryWithChatHistoryFlow = ai.defineFlow(
  {
    name: 'answerTextQueryWithChatHistoryFlow',
    inputSchema: AnswerTextQueryWithChatHistoryInputSchema,
    outputSchema: AnswerTextQueryWithChatHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {response: output!.response};
  }
);
