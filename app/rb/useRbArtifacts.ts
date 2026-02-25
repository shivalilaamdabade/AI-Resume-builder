'use client';

import { useState, useEffect } from 'react';

export interface ArtifactData {
  content: string;
  uploadedAt: Date;
}

export const useRbArtifacts = () => {
  const [artifacts, setArtifacts] = useState<Record<string, ArtifactData>>({});
  const [loading, setLoading] = useState(true);

  // Load artifacts from localStorage on mount
  useEffect(() => {
    const storedArtifacts = localStorage.getItem('rb_artifacts');
    if (storedArtifacts) {
      try {
        const parsed = JSON.parse(storedArtifacts);
        // Convert date strings back to Date objects
        const convertedArtifacts: Record<string, ArtifactData> = {};
        Object.keys(parsed).forEach(key => {
          convertedArtifacts[key] = {
            content: parsed[key].content,
            uploadedAt: new Date(parsed[key].uploadedAt),
          };
        });
        setArtifacts(convertedArtifacts);
      } catch (error) {
        console.error('Failed to parse stored artifacts:', error);
      }
    }
    setLoading(false);
  }, []);

  // Save artifacts to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      const serializableArtifacts: Record<string, { content: string; uploadedAt: string }> = {};
      Object.keys(artifacts).forEach(key => {
        serializableArtifacts[key] = {
          content: artifacts[key].content,
          uploadedAt: artifacts[key].uploadedAt.toISOString(),
        };
      });
      localStorage.setItem('rb_artifacts', JSON.stringify(serializableArtifacts));
    }
  }, [artifacts, loading]);

  const saveArtifact = (stepId: string, content: string) => {
    setArtifacts((prev: Record<string, ArtifactData>) => ({
      ...prev,
      [`rb_${stepId}_artifact`]: {
        content,
        uploadedAt: new Date(),
      },
    }));
  };

  const getArtifact = (stepId: string): ArtifactData | null => {
    const key = `rb_${stepId}_artifact`;
    return artifacts[key] || null;
  };

  const isStepComplete = (stepId: string): boolean => {
    return !!getArtifact(stepId);
  };

  const getAllStepsStatus = (): Record<string, boolean> => {
    const status: Record<string, boolean> = {};
    for (let i = 1; i <= 8; i++) {
      const stepId = `${i.toString().padStart(2, '0')}-${['problem', 'market', 'architecture', 'hld', 'lld', 'build', 'test', 'ship'][i-1]}`;
      status[stepId] = isStepComplete(stepId);
    }
    return status;
  };

  const isPreviousStepComplete = (stepId: string): boolean => {
    const stepNumber = parseInt(stepId.split('-')[0], 10);
    if (stepNumber <= 1) return true; // First step doesn't need previous
    
    const prevStepNumber = stepNumber - 1;
    const prevStepType = ['problem', 'market', 'architecture', 'hld', 'lld', 'build', 'test', 'ship'][prevStepNumber - 1];
    const prevStepId = `${prevStepNumber.toString().padStart(2, '0')}-${prevStepType}`;
    
    return isStepComplete(prevStepId);
  };

  return {
    artifacts,
    loading,
    saveArtifact,
    getArtifact,
    isStepComplete,
    getAllStepsStatus,
    isPreviousStepComplete,
  };
};