import { DetailedCropPlanner } from '@/components/features/detailed-crop-planner';

export default function CropPlannerPage() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <DetailedCropPlanner />
      </main>
    </div>
  );
}
