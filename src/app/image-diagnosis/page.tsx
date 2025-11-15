import { ImageDiagnosisForm } from '@/components/features/image-diagnosis-form';
import { Header } from '@/components/layout/header';

export default function ImageDiagnosisPage() {
  return (
    <div className="flex flex-col">
      <Header title="Image Diagnosis" />
      <main className="p-4 md:p-6 lg:p-8">
        <ImageDiagnosisForm />
      </main>
    </div>
  );
}
