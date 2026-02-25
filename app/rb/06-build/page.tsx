'use client';

import { useRouter } from 'next/navigation';
import RbStepPage from '@/app/rb/_components/RbStepPage';
import { getStepNumber } from '@/app/rb/stepsConfig';

const BuildPage = () => {
  const router = useRouter();
  const stepId = '06-build';
  const stepNumber = getStepNumber(stepId);

  const handleNext = () => {
    router.push('/rb/07-test');
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
        <h2>Build Phase</h2>
        <p>Implementation of the AI Resume Builder solution.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Develop the frontend components</li>
          <li>Implement backend services</li>
          <li>Integrate AI/ML models for resume generation</li>
          <li>Connect to databases and external services</li>
          <li>Implement authentication and authorization</li>
        </ul>
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold">Guidance:</h3>
          <p>Begin implementation of your solution following the designs and architecture created in previous steps.</p>
        </div>
      </div>
    </RbStepPage>
  );
};

export default BuildPage;