import { ImageDiagnosisForm } from '@/components/features/image-diagnosis-form';

export default function ImageDiagnosisPage() {
  return (
    <div className="flex flex-col">
      <main className="p-4 md:p-6 lg:p-8">
        <ImageDiagnosisForm />
      </main>
    </div>
  );
}
