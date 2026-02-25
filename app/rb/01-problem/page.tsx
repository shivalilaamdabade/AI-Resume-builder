'use client';

import { useRouter } from 'next/navigation';
import RbStepPage from '../_components/RbStepPage';
import { getStepNumber, TOTAL_STEPS } from '../stepsConfig';

const ProblemPage = () => {
  const router = useRouter();
  const stepId = '01-problem';
  const stepNumber = getStepNumber(stepId);

  const handleNext = () => {
    router.push('/rb/02-market');
  };

  const handlePrev = () => {
    // No previous step for the first step
  };

  return (
    <RbStepPage 
      stepId={stepId} 
      onNext={handleNext} 
      onPrev={handlePrev}
    >
      <div className="prose max-w-none">
        <h2>Define the Problem</h2>
        <p>Clearly articulate the problem you are trying to solve with your AI Resume Builder.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>What specific pain points do job seekers face when creating resumes?</li>
          <li>How are current solutions falling short?</li>
          <li>Who is your target audience?</li>
          <li>What makes your solution unique?</li>
        </ul>
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold">Guidance:</h3>
          <p>Focus on the core problem. Be specific about the user pain points and market gaps you've identified.</p>
        </div>
      </div>
    </RbStepPage>
  );
};

export default ProblemPage;