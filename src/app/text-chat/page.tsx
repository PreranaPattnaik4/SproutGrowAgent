import { TextChatInterface } from '@/components/features/text-chat-interface';
import { Card } from '@/components/ui/card';

export default function TextChatPage() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-hidden p-4 md:p-6">
        <Card className="flex h-full flex-col">
          <TextChatInterface />
        </Card>
      </main>
    </div>
  );
}
