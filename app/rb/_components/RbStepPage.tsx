'use client';

import { ReactNode, useState } from 'react';
import { useRbArtifacts } from '../useRbArtifacts';
import { getStepNumber, getStepById, TOTAL_STEPS } from '../stepsConfig';
import RbBuildPanel from '../RbBuildPanel';

interface RbStepPageProps {
  stepId: string;
  children: ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
}

const RbStepPage = ({ stepId, children, onNext, onPrev }: RbStepPageProps) => {
  const stepNumber = getStepNumber(stepId);
  const step = getStepById(stepId);
  const [artifactContent, setArtifactContent] = useState('');
  
  const { 
    isStepComplete, 
    isPreviousStepComplete, 
    saveArtifact,
    getArtifact 
  } = useRbArtifacts();

  if (!step) {
    return <div>Step not found</div>;
  }

  const canNavigateNext = isStepComplete(stepId) || artifactContent.trim() !== '';
  
  // Calculate previous step ID
  const prevStepNumber = stepNumber > 1 ? stepNumber - 1 : 0;
  const stepTypes = ['problem', 'market', 'architecture', 'hld', 'lld', 'build', 'test', 'ship'];
  const prevStepType = prevStepNumber > 0 ? stepTypes[prevStepNumber - 1] : '';
  const prevStepId = prevStepNumber > 0 ? `${prevStepNumber.toString().padStart(2, '0')}-${prevStepType}` : '';
  
  const canNavigatePrev = stepNumber > 1 && isPreviousStepComplete(prevStepId);
  
  const handleSaveAndContinue = () => {
    if (artifactContent.trim()) {
      saveArtifact(stepId, artifactContent);
    }
    if (onNext) {
      onNext();
    }
  };

  const handleLoadArtifact = () => {
    const artifact = getArtifact(stepId);
    if (artifact) {
      setArtifactContent(artifact.content);
    }
  };

  // Load artifact on initial render
  if (typeof window !== 'undefined' && !artifactContent) {
    setTimeout(handleLoadArtifact, 0);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="text-xl font-bold">AI Resume Builder</div>
        <div className="text-lg">Project 3 — Step {stepNumber} of {TOTAL_STEPS}</div>
        <div className={`px-3 py-1 rounded-full text-sm ${
          isStepComplete(stepId) 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {isStepComplete(stepId) ? 'Completed' : 'In Progress'}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[70%] p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">{step.title}</h1>
          <p className="text-gray-600 mb-6">{step.description}</p>
          
          <div className="mb-6">
            {children}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={onPrev}
              disabled={!canNavigatePrev}
              className={`px-4 py-2 rounded ${
                canNavigatePrev 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={handleSaveAndContinue}
              disabled={!canNavigateNext}
              className={`px-4 py-2 rounded ${
                canNavigateNext 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isStepComplete(stepId) ? 'Continue' : 'Save & Continue'}
            </button>
          </div>
        </div>
        
        {/* Build Panel (30%) */}
        <div className="w-[30%] border-l p-4 bg-gray-50 overflow-y-auto">
          <RbBuildPanel 
            stepId={stepId}
            artifactContent={artifactContent}
            onContentChange={setArtifactContent}
          />
        </div>
      </div>
    </div>
  );
};

export default RbStepPage;