'use server';

import { aiStylingAssistant, AiStylingAssistantInput, AiStylingAssistantOutput } from "@/ai/flows/ai-styling-assistant";

type ActionResult = 
    | { success: true; data: AiStylingAssistantOutput }
    | { success: false; error: string };


export async function getStylingAdvice(input: AiStylingAssistantInput): Promise<ActionResult> {
    try {
        const result = await aiStylingAssistant(input);
        return { success: true, data: result };
    } catch (e) {
        console.error("Error getting styling advice:", e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return { success: false, error: `Failed to get styling advice. ${errorMessage}` };
    }
}
