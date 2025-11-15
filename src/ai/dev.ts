import { config } from 'dotenv';
config();

import '@/ai/flows/answer-text-query-with-chat-history.ts';
import '@/ai/flows/answer-voice-query-with-integrated-info.ts';
import '@/ai/flows/diagnose-plant-disease-from-image.ts';
import '@/ai/flows/generate-crop-plan.ts';
