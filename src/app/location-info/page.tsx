import { LocationInfoDisplay } from '@/components/features/location-info-display';
import { Header } from '@/components/layout/header';

export default function LocationInfoPage() {
  return (
    <div className="flex flex-col">
      <Header title="Local Information" />
      <main className="p-4 md:p-6 lg:p-8">
        <LocationInfoDisplay />
      </main>
    </div>
  );
}
