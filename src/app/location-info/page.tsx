import { LocationInfoDisplay } from '@/components/features/location-info-display';

export default function LocationInfoPage() {
  return (
    <div className="flex flex-col">
      <main className="p-4 md:p-6 lg:p-8">
        <LocationInfoDisplay />
      </main>
    </div>
  );
}
