'use server';
/**
 * @fileOverview An AI styling assistant that recommends outfit combinations and styling tips.
 *
 * - aiStylingAssistant - A function that handles the AI styling assistant process.
 * - AiStylingAssistantInput - The input type for the aiStylingAssistant function.
 * - AiStylingAssistantOutput - The return type for the aiStylingAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiStylingAssistantInputSchema = z.object({
  kentePatternDescription: z
    .string()
    .describe(
      'A detailed description of the Kente pattern, including colors, motifs, and overall aesthetic of the product.'
    ),
  personalStyle: z
    .string()
    .optional()
    .describe(
      'The user\'s preferred personal style (e.g., "casual", "formal", "boho", "minimalist").'
    ),
  occasion: z
    .string()
    .optional()
    .describe(
      'The occasion for which the outfit is being styled (e.g., "weekend outing", "special event", "work", "date night").'
    ),
});
export type AiStylingAssistantInput = z.infer<typeof AiStylingAssistantInputSchema>;

const AiStylingAssistantOutputSchema = z.object({
  outfitCombinations: z
    .array(z.string())
    .describe('An array of suggested outfit combinations, describing each item in the outfit.'),
  stylingTips: z
    .array(z.string())
    .describe('An array of general styling tips related to the Kente pattern and overall look.'),
});
export type AiStylingAssistantOutput = z.infer<typeof AiStylingAssistantOutputSchema>;

export async function aiStylingAssistant(
  input: AiStylingAssistantInput
): Promise<AiStylingAssistantOutput> {
  return aiStylingAssistantFlow(input);
}

const aiStylingAssistantPrompt = ai.definePrompt({
  name: 'aiStylingAssistantPrompt',
  input: {schema: AiStylingAssistantInputSchema},
  output: {schema: AiStylingAssistantOutputSchema},
  prompt: `You are an expert fashion stylist specializing in blending African tradition with modern streetwear culture. Your goal is to help users integrate Kentekrown's African-inspired products into their wardrobe with pride and style.

The user is interested in styling an item featuring the following Kente pattern:
Kente Pattern Description: {{{kentePatternDescription}}}

{{#if personalStyle}}
The user's personal style preference is: {{{personalStyle}}}
{{/if}}

{{#if occasion}}
The outfit is for the following occasion: {{{occasion}}}
{{/if}}

Please provide creative and fashionable outfit combinations and styling tips that highlight the Kente pattern and celebrate African heritage, suitable for the specified style and occasion. Ensure the suggestions resonate with Kentekrown's brand, focusing on confidence and modern flair.

Output should be a JSON object with two fields: "outfitCombinations" (an array of strings, each describing a full outfit) and "stylingTips" (an array of strings, each a specific tip).`,
});

const aiStylingAssistantFlow = ai.defineFlow(
  {
    name: 'aiStylingAssistantFlow',
    inputSchema: AiStylingAssistantInputSchema,
    outputSchema: AiStylingAssistantOutputSchema,
  },
  async input => {
    const {output} = await aiStylingAssistantPrompt(input);
    return output!;
  }
);
