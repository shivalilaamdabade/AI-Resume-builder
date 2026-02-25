'use client';

import { useRouter } from 'next/navigation';
import RbStepPage from '../_components/RbStepPage';
import { getStepNumber } from '../stepsConfig';

const HldPage = () => {
  const router = useRouter();
  const stepId = '04-hld';
  const stepNumber = getStepNumber(stepId);

  const handleNext = () => {
    router.push('/rb/05-lld');
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
        <h2>High Level Design</h2>
        <p>Create detailed high-level design documentation for your AI Resume Builder.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Define the main modules and their responsibilities</li>
          <li>Detail the APIs and interfaces between components</li>
          <li>Specify data models and database schemas</li>
          <li>Outline the security measures</li>
          <li>Describe deployment architecture</li>
        </ul>
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold">Guidance:</h3>
          <p>Provide detailed documentation for each component, their interfaces, and how they interact with each other.</p>
        </div>
      </div>
    </RbStepPage>
  );
};

export default HldPage;