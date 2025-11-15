import { VoiceAssistantUI } from '@/components/features/voice-assistant-ui';

export default function VoiceAssistantPage() {
  return (
    <div className="flex flex-col">
      <main className="p-4 md:p-6 lg:p-8">
        <VoiceAssistantUI />
      </main>
    </div>
  );
}
