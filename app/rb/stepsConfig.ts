export interface StepConfig {
  id: string;
  title: string;
  description: string;
  artifactRequired: boolean;
}

export const STEPS: StepConfig[] = [
  {
    id: '01-problem',
    title: 'Problem Statement',
    description: 'Define the problem you are solving',
    artifactRequired: true,
  },
  {
    id: '02-market',
    title: 'Market Research',
    description: 'Research the market and competition',
    artifactRequired: true,
  },
  {
    id: '03-architecture',
    title: 'System Architecture',
    description: 'Design the system architecture',
    artifactRequired: true,
  },
  {
    id: '04-hld',
    title: 'High Level Design',
    description: 'Create high level design documentation',
    artifactRequired: true,
  },
  {
    id: '05-lld',
    title: 'Low Level Design',
    description: 'Create low level design documentation',
    artifactRequired: true,
  },
  {
    id: '06-build',
    title: 'Build Phase',
    description: 'Implementation of the solution',
    artifactRequired: true,
  },
  {
    id: '07-test',
    title: 'Testing',
    description: 'Test the implementation',
    artifactRequired: true,
  },
  {
    id: '08-ship',
    title: 'Deployment',
    description: 'Deploy and ship the product',
    artifactRequired: true,
  },
];

export const TOTAL_STEPS = STEPS.length;

export const getStepNumber = (stepId: string): number => {
  const index = STEPS.findIndex(step => step.id === stepId);
  return index !== -1 ? index + 1 : 0;
};

export const getStepById = (stepId: string): StepConfig | undefined => {
  return STEPS.find(step => step.id === stepId);
};