import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ResumeData, Section, Template } from '../types/resume';

interface ResumeState {
  data: ResumeData;
  currentStep: number;
  totalSteps: number;
  selectedTemplate: Template;
  isPreviewMode: boolean;
}

type Action =
  | { type: 'UPDATE_SECTION'; payload: { section: Section; data: any } }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_TEMPLATE'; payload: Template }
  | { type: 'TOGGLE_PREVIEW' }
  | { type: 'RESET_RESUME' };

const initialResumeData: ResumeData = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: []
};

const initialState: ResumeState = {
  data: initialResumeData,
  currentStep: 0,
  totalSteps: 6,
  selectedTemplate: 'modern',
  isPreviewMode: false
};

const resumeReducer = (state: ResumeState, action: Action): ResumeState => {
  switch (action.type) {
    case 'UPDATE_SECTION':
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.section]: action.payload.data
        }
      };
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1)
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0)
      };
    case 'SET_TEMPLATE':
      return {
        ...state,
        selectedTemplate: action.payload
      };
    case 'TOGGLE_PREVIEW':
      return {
        ...state,
        isPreviewMode: !state.isPreviewMode
      };
    case 'RESET_RESUME':
      return {
        ...initialState,
        selectedTemplate: state.selectedTemplate
      };
    default:
      return state;
  }
};

interface ResumeContextProps {
  state: ResumeState;
  updateSection: (section: Section, data: any) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setTemplate: (template: Template) => void;
  togglePreview: () => void;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  const updateSection = (section: Section, data: any) => {
    dispatch({ type: 'UPDATE_SECTION', payload: { section, data } });
  };

  const setStep = (step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const nextStep = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const prevStep = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const setTemplate = (template: Template) => {
    dispatch({ type: 'SET_TEMPLATE', payload: template });
  };

  const togglePreview = () => {
    dispatch({ type: 'TOGGLE_PREVIEW' });
  };

  const resetResume = () => {
    dispatch({ type: 'RESET_RESUME' });
  };

  return (
    <ResumeContext.Provider
      value={{
        state,
        updateSection,
        setStep,
        nextStep,
        prevStep,
        setTemplate,
        togglePreview,
        resetResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};