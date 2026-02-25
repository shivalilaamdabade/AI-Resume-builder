'use client';

import { useState } from 'react';

interface RbBuildPanelProps {
  stepId: string;
  artifactContent: string;
  onContentChange: (content: string) => void;
}

const RbBuildPanel = ({ stepId, artifactContent, onContentChange }: RbBuildPanelProps) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [buildStatus, setBuildStatus] = useState<'idle' | 'success' | 'error' | 'screenshot'>('idle');

  const handleCopy = () => {
    navigator.clipboard.writeText(artifactContent);
    setCopyStatus('copied');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const handleBuild = () => {
    // Simulate build process
    setBuildStatus('success');
    setTimeout(() => setBuildStatus('idle'), 3000);
  };

  const handleStatusChange = (status: 'idle' | 'success' | 'error' | 'screenshot') => {
    setBuildStatus(status);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Build Panel</h2>
      
      <div className="mb-4">
        <textarea
          value={artifactContent}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onContentChange(e.target.value)}
          placeholder="Copy this into Lovable..."
          className="w-full h-40 p-2 border rounded resize-none"
        />
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={handleCopy}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {copyStatus === 'copied' ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      <div className="mt-4">
        <button
          onClick={handleBuild}
          className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
        >
          Build in Lovable
        </button>
      </div>
      
      <div className="mt-4 space-y-2">
        <h3 className="font-medium">Status:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleStatusChange('success')}
            className={`flex-1 py-1 px-2 rounded text-sm ${
              buildStatus === 'success' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
          >
            It Worked
          </button>
          <button
            onClick={() => handleStatusChange('error')}
            className={`flex-1 py-1 px-2 rounded text-sm ${
              buildStatus === 'error' ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
          >
            Error
          </button>
          <button
            onClick={() => handleStatusChange('screenshot')}
            className={`flex-1 py-1 px-2 rounded text-sm ${
              buildStatus === 'screenshot' ? 'bg-yellow-500 text-white' : 'bg-gray-200'
            }`}
          >
            Add Screenshot
          </button>
        </div>
      </div>
      
      {buildStatus !== 'idle' && (
        <div className={`mt-2 p-2 rounded text-white text-center ${
          buildStatus === 'success' ? 'bg-green-500' :
          buildStatus === 'error' ? 'bg-red-500' :
          'bg-yellow-500'
        }`}>
          {buildStatus === 'success' ? 'Build successful!' :
           buildStatus === 'error' ? 'Build failed!' :
           'Screenshot needed!'}
        </div>
      )}
    </div>
  );
};

export default RbBuildPanel;