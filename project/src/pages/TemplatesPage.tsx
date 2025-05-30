import React, { useState } from 'react';
import TemplateGallery from '../components/templates/TemplateGallery';
import ResumeEditor from '../components/editor/ResumeEditor';
import ResumePreview from '../components/editor/ResumePreview';
import { Template } from '../types/templates';
import { initialResumeData } from '../data/initialResumeData';
import { ResumeData } from '../types/resume';

const TemplatesPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isEditing, setIsEditing] = useState(false);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setIsEditing(true);
  };

  const handleBackToGallery = () => {
    setIsEditing(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {!isEditing ? (
          <TemplateGallery onSelectTemplate={handleTemplateSelect} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Edit Your Resume</h2>
                <button 
                  onClick={handleBackToGallery}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  Back to Templates
                </button>
              </div>
              <ResumeEditor 
                resumeData={resumeData} 
                setResumeData={setResumeData} 
              />
            </div>
            <div className="lg:col-span-7">
              <div className="sticky top-8">
                <ResumePreview 
                  template={selectedTemplate} 
                  resumeData={resumeData} 
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TemplatesPage;