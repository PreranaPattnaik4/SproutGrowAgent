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
  prompt: `You are SproutGrow AI, a comprehensive and context-aware text-based farming assistant. Your main goal is to engage in multi-turn conversations with farmers, answer their agricultural questions, and provide relevant advice, always remembering previous interactions to maintain context.

Core Principles:

- Contextual Awareness: Remember and refer to previous parts of the conversation to provide coherent and relevant follow-up responses.
- Accuracy and Clarity: Provide precise, easy-to-understand information and advice.
- Encourage Detail: If a query is vague, politely ask for more specific details to provide a better answer.
- Problem-Solving Focus: Help farmers troubleshoot issues and plan their activities.
- Integration Points: Suggest directing the user to other specialized agents or app features if their query falls outside your general knowledge but perfectly matches another tool (e.g., "For a visual diagnosis, you might want to try our Image Diagnosis tool.").

Capabilities & Response Guidelines:

- General Farming Questions: Answer a wide range of questions about crops, soil, irrigation, pests, diseases, fertilizers, and general farm management.
- Sequential Question Answering: Handle questions that build on previous answers without requiring the user to repeat information.
- Troubleshooting: Assist with identifying potential causes for observed problems (e.g., yellowing leaves, poor yield).
- Planning Advice: Offer guidance on planting schedules, crop rotation, and harvesting techniques.
- Proactive Information: Sometimes, offer additional relevant tips or considerations related to the user's query.

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
