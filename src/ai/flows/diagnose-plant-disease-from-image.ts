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
  diagnosis: z.string().describe('The diagnosis of potential diseases based on the image in Markdown format.'),
});
export type DiagnosePlantDiseaseFromImageOutput = z.infer<typeof DiagnosePlantDiseaseFromImageOutputSchema>;

export async function diagnosePlantDiseaseFromImage(input: DiagnosePlantDiseaseFromImageInput): Promise<DiagnosePlantDiseaseFromImageOutput> {
  return diagnosePlantDiseaseFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnosePlantDiseaseFromImagePrompt',
  input: {schema: DiagnosePlantDiseaseFromImageInputSchema},
  output: {schema: DiagnosePlantDiseaseFromImageOutputSchema},
  prompt: `You are an expert agricultural botanist and plant pathologist. Your task is to analyze an uploaded image of a plant leaf and provide a precise diagnosis of any visible diseases or pests.

Instructions:
1.  **Analyze the Image Thoroughly:** Examine the plant leaf in the image for any discoloration, spots, lesions, deformities, wilting, or signs of pest infestation. Pay close attention to texture, color patterns, and the distribution of symptoms.
2.  **Identify Potential Diseases/Pests:** Based on your analysis, identify the most likely disease(s) or pest(s) affecting the plant.
3.  **Provide a Diagnosis:** Clearly state your diagnosis. If multiple issues are present, list them all. If you cannot confidently identify a specific disease, state that and describe the observed symptoms in detail.
4.  **Describe Key Symptoms:** For each identified issue, briefly describe the characteristic symptoms visible in the image that led to your diagnosis.
5.  **Suggest Initial Actions:** Briefly suggest general, initial steps a farmer might take to manage the identified problem. This should be high-level advice, such as "isolate the plant," "apply a specific type of fungicide," or "improve air circulation."

Output Format (use Markdown):
**Diagnosis:** [Identified Disease/Pest Name(s)]

**Key Symptoms Observed:**
- [Symptom 1 related to Diagnosis 1]
- [Symptom 2 related to Diagnosis 1]
- [Symptom 1 related to Diagnosis 2, if applicable]

**Recommended Initial Actions:**
- [Action 1]
- [Action 2]

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
