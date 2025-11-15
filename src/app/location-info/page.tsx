import { LocationInfoDisplay } from '@/components/features/location-info-display';
import { Header } from '@/components/layout/header';

export default function LocationInfoPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Local Information" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <LocationInfoDisplay />
      </main>
    </div>
  );
}
