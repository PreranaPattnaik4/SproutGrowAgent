'use server';
/**
 * @fileOverview A plant disease diagnosis AI agent from an image.
 *
 * - diagnosePlantDiseaseFromImage - A function that handles the plant disease diagnosis process from an image.
 * - DiagnosePlantDiseaseFromImageInput - The input type for the diagnosePlantDiseaseFromImage function.
 * - DiagnosePlantDiseaseFromImageOutput - The return type for the diagnosePlantDiseaseFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnosePlantDiseaseFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant leaf, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DiagnosePlantDiseaseFromImageInput = z.infer<typeof DiagnosePlantDiseaseFromImageInputSchema>;

const DiagnosePlantDiseaseFromImageOutputSchema = z.object({
  diagnosis: z.string().describe('The diagnosis of potential diseases based on the image.'),
});
export type DiagnosePlantDiseaseFromImageOutput = z.infer<typeof DiagnosePlantDiseaseFromImageOutputSchema>;

export async function diagnosePlantDiseaseFromImage(input: DiagnosePlantDiseaseFromImageInput): Promise<DiagnosePlantDiseaseFromImageOutput> {
  return diagnosePlantDiseaseFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnosePlantDiseaseFromImagePrompt',
  input: {schema: DiagnosePlantDiseaseFromImageInputSchema},
  output: {schema: DiagnosePlantDiseaseFromImageOutputSchema},
  prompt: `You are an expert plant pathologist. Analyze the image of the plant leaf and provide a diagnosis of potential diseases. Be as specific as possible.

Image: {{media url=photoDataUri}}`,
});

const diagnosePlantDiseaseFromImageFlow = ai.defineFlow(
  {
    name: 'diagnosePlantDiseaseFromImageFlow',
    inputSchema: DiagnosePlantDiseaseFromImageInputSchema,
    outputSchema: DiagnosePlantDiseaseFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
