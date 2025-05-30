import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';
import ResumeForm from '../components/builder/ResumeForm';
import ResumePreview from '../components/preview/ResumePreview';
import PersonalInfoForm from '../components/builder/PersonalInfoForm';
import ExperienceForm from '../components/builder/ExperienceForm';
import EducationForm from '../components/builder/EducationForm';
import SkillsForm from '../components/builder/SkillsForm';
import ProjectsForm from '../components/builder/ProjectsForm';
import CertificationsForm from '../components/builder/CertificationsForm';


const steps = [
  { id: 'personal', label: 'Personal Info', path: '' },
  { id: 'experience', label: 'Experience', path: 'experience' },
  { id: 'education', label: 'Education', path: 'education' },
  { id: 'skills', label: 'Skills', path: 'skills' },
  { id: 'projects', label: 'Projects', path: 'projects' },
  { id: 'certifications', label: 'Certifications', path: 'certifications' },
];

const BuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, setStep } = useResume();
  
  const currentPath = location.pathname.split('/builder/')[1] || '';
  const currentStepIndex = steps.findIndex(step => step.path === currentPath);
  
  React.useEffect(() => {
    if (currentStepIndex !== -1) {
      setStep(currentStepIndex);
    }
  }, [currentStepIndex, setStep]);



  const handleStepClick = (index: number) => {
    setStep(index);
    navigate(`/builder/${steps[index].path}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Build Your Resume</h1>
        
        <div className="flex flex-wrap mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => handleStepClick(index)}
                className={`flex items-center px-4 py-2 rounded-md ${
                  index === state.currentStep 
                    ? 'bg-blue-900 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center mr-2 bg-white text-xs font-semibold text-blue-900">
                  {index + 1}
                </span>
                {step.label}
              </button>
              {index < steps.length - 1 && (
                <div className="w-4 h-0.5 bg-gray-300 mx-1"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Routes>
            <Route index element={<PersonalInfoForm />} />
            <Route path="experience" element={<ExperienceForm />} />
            <Route path="education" element={<EducationForm />} />
            <Route path="skills" element={<SkillsForm />} />
            <Route path="projects" element={<ProjectsForm />} />
            <Route path="certifications" element={<CertificationsForm />} />
          </Routes>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 hidden lg:block">
          <div className="sticky top-24">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Resume Preview</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform scale-75 origin-top-left">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;