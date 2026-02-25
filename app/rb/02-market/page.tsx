'use client';

import { useRouter } from 'next/navigation';
import RbStepPage from '@/app/rb/_components/RbStepPage';
import { getStepNumber } from '@/app/rb/stepsConfig';

const MarketPage = () => {
  const router = useRouter();
  const stepId = '02-market';
  const stepNumber = getStepNumber(stepId);

  const handleNext = () => {
    router.push('/rb/03-architecture');
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
        <h2>Market Research</h2>
        <p>Analyze the market landscape for AI Resume Builders.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Who are the main competitors?</li>
          <li>What features do they offer?</li>
          <li>What are their pricing models?</li>
          <li>What are the gaps in the market?</li>
          <li>What is your competitive advantage?</li>
        </ul>
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold">Guidance:</h3>
          <p>Research existing solutions like Resume.io, Zety, Enhancv, and others. Identify their strengths and weaknesses.</p>
        </div>
      </div>
    </RbStepPage>
  );
};

export default MarketPage;