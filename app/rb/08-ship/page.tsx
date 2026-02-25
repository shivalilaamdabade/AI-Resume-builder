'use client';

import { useRouter } from 'next/navigation';
import RbStepPage from '../_components/RbStepPage';
import { getStepNumber } from '../stepsConfig';

const ShipPage = () => {
  const router = useRouter();
  const stepId = '08-ship';
  const stepNumber = getStepNumber(stepId);

  const handleNext = () => {
    router.push('/rb/proof');
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
        <h2>Deployment</h2>
        <p>Deploy and ship the AI Resume Builder product.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Prepare for production deployment</li>
          <li>Configure production infrastructure</li>
          <li>Deploy the application</li>
          <li>Monitor system performance</li>
          <li>Gather user feedback</li>
        </ul>
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold">Guidance:</h3>
          <p>Finalize your solution and prepare it for release to users. Ensure everything is working correctly in production.</p>
        </div>
      </div>
    </RbStepPage>
  );
};

export default ShipPage;