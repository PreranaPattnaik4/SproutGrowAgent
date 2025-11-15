import { UnifiedAssistant } from '@/components/features/unified-assistant';

export default function AiAssistantPage() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8">
        <UnifiedAssistant />
      </main>
    </div>
  );
}
