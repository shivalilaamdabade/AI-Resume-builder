'use client';

import { useState } from 'react';
import { STEPS, getStepNumber } from '../stepsConfig';
import { useRbArtifacts } from '../useRbArtifacts';

const ProofPage = () => {
  const { getAllStepsStatus, loading } = useRbArtifacts();
  const [links, setLinks] = useState({
    lovable: '',
    github: '',
    deploy: ''
  });

  const stepStatus = getAllStepsStatus();

  const handleSubmit = () => {
    // Combine all step artifacts and links into a submission string
    let submission = "AI Resume Builder - Build Track Submission\n";
    submission += "=====================================\n\n";
    
    STEPS.forEach(step => {
      const stepNumber = getStepNumber(step.id);
      submission += `Step ${stepNumber}: ${step.title}\n`;
      submission += `Status: ${stepStatus[step.id] ? 'COMPLETED' : 'INCOMPLETE'}\n\n`;
    });
    
    submission += "\nLinks:\n";
    submission += `Lovable Link: ${links.lovable || 'Not provided'}\n`;
    submission += `GitHub Link: ${links.github || 'Not provided'}\n`;
    submission += `Deploy Link: ${links.deploy || 'Not provided'}\n`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(submission);
    alert('Submission copied to clipboard!');
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  const allStepsComplete = STEPS.every(step => stepStatus[step.id]);

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="text-xl font-bold">AI Resume Builder</div>
        <div className="text-lg">Project 3 — Proof</div>
        <div className={`px-3 py-1 rounded-full text-sm ${
          allStepsComplete 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {allStepsComplete ? 'All Steps Complete' : 'Steps Incomplete'}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Proof of Build</h1>
        <p className="text-gray-600 mb-8">Review your 8 build steps, attach links, and copy your final submission.</p>
        
        {/* Step Status Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Step Completion Status</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Step #</th>
                  <th className="py-2 px-4 border-b text-left">Title</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {STEPS.map((step, index) => (
                  <tr key={step.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-2 px-4 border-b">{getStepNumber(step.id)}</td>
                    <td className="py-2 px-4 border-b">{step.title}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded text-xs ${
                        stepStatus[step.id] 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {stepStatus[step.id] ? 'Complete' : 'Incomplete'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Links Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Project Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lovable Link</label>
              <input
                type="url"
                value={links.lovable}
                onChange={(e) => setLinks({...links, lovable: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="https://lovable.example.com/project"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
              <input
                type="url"
                value={links.github}
                onChange={(e) => setLinks({...links, github: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="https://github.com/user/repo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deploy Link</label>
              <input
                type="url"
                value={links.deploy}
                onChange={(e) => setLinks({...links, deploy: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="https://deployed-app.com"
              />
            </div>
          </div>
        </div>
        
        {/* Submission Button */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={!allStepsComplete}
            className={`px-6 py-3 rounded-lg text-lg font-medium ${
              allStepsComplete
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Copy Final Submission
          </button>
          {!allStepsComplete && (
            <p className="mt-2 text-red-500">
              All steps must be completed before you can submit
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProofPage;