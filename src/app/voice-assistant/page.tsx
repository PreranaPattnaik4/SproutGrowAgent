import { VoiceAssistantUI } from '@/components/features/voice-assistant-ui';
import { Header } from '@/components/layout/header';

export default function VoiceAssistantPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Voice Assistant" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <VoiceAssistantUI />
      </main>
    </div>
  );
}
