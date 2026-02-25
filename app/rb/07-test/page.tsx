'use client';

import { useRouter } from 'next/navigation';
import RbStepPage from '../_components/RbStepPage';
import { getStepNumber } from '../stepsConfig';

const TestPage = () => {
  const router = useRouter();
  const stepId = '07-test';
  const stepNumber = getStepNumber(stepId);

  const handleNext = () => {
    router.push('/rb/08-ship');
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
        <h2>Testing</h2>
        <p>Comprehensive testing of the AI Resume Builder solution.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Unit tests for individual components</li>
          <li>Integration tests for component interactions</li>
          <li>User acceptance testing</li>
          <li>Performance and load testing</li>
          <li>Security testing</li>
        </ul>
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold">Guidance:</h3>
          <p>Ensure your solution meets all requirements and is ready for deployment through comprehensive testing.</p>
        </div>
      </div>
    </RbStepPage>
  );
};

export default TestPage;