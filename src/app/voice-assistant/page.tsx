import { VoiceAssistantUI } from '@/components/features/voice-assistant-ui';
import { Header } from '@/components/layout/header';

export default function VoiceAssistantPage() {
  return (
    <div className="flex flex-col">
      <Header title="Voice Assistant" />
      <main className="p-4 md:p-6 lg:p-8">
        <VoiceAssistantUI />
      </main>
    </div>
  );
}
