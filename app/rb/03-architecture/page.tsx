'use client';

import { useRouter } from 'next/navigation';
import RbStepPage from '../_components/RbStepPage';
import { getStepNumber } from '../stepsConfig';

const ArchitecturePage = () => {
  const router = useRouter();
  const stepId = '03-architecture';
  const stepNumber = getStepNumber(stepId);

  const handleNext = () => {
    router.push('/rb/04-hld');
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
        <h2>System Architecture</h2>
        <p>Design the high-level architecture for your AI Resume Builder.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>What are the main components of your system?</li>
          <li>How will they interact with each other?</li>
          <li>What technologies will you use for each component?</li>
          <li>How will you handle data flow?</li>
          <li>What are the security considerations?</li>
        </ul>
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold">Guidance:</h3>
          <p>Create a diagram showing the major components and their interactions. Consider frontend, backend, AI/ML services, database, and third-party integrations.</p>
        </div>
      </div>
    </RbStepPage>
  );
};

export default ArchitecturePage;