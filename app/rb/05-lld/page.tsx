'use client';

import { useRouter } from 'next/navigation';
import RbStepPage from '@/app/rb/_components/RbStepPage';
import { getStepNumber } from '@/app/rb/stepsConfig';

const LldPage = () => {
  const router = useRouter();
  const stepId = '05-lld';
  const stepNumber = getStepNumber(stepId);

  const handleNext = () => {
    router.push('/rb/06-build');
  };

  const handlePrev = () => {
    router.back();
  };

  return (
    <RbStepPage 
      stepId={stepId} 
      onNext={handleNext} 
      onPrev={handlePrev}
    >
      <div className="prose max-w-none">
        <h2>Low Level Design</h2>
        <p>Create detailed low-level design documentation for your AI Resume Builder.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Define class structures and method signatures</li>
          <li>Detail algorithms for core functionality</li>
          <li>Specify data structures and their relationships</li>
          <li>Outline error handling mechanisms</li>
          <li>Detail UI component specifications</li>
        </ul>
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold">Guidance:</h3>
          <p>Provide implementation-level details for developers, including class diagrams, algorithm descriptions, and UI component specs.</p>
        </div>
      </div>
    </RbStepPage>
  );
};

export default LldPage;