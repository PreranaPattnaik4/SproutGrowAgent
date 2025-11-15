import { ImageDiagnosisForm } from '@/components/features/image-diagnosis-form';
import { Header } from '@/components/layout/header';

export default function ImageDiagnosisPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Image Diagnosis" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <ImageDiagnosisForm />
      </main>
    </div>
  );
}
