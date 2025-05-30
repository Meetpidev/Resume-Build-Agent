import React from 'react';
import { Education } from '../../../types/resume';
import FormField from '../../ui/FormField';
import TextareaField from '../../ui/TextareaField';
import { Plus, Trash2 } from 'lucide-react';
import { AIChatSession } from './../../../services/AImodels';
import { useToast } from '../../ui/Toast';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ education, onChange }) => {
  const handleChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onChange(newEducation);
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    onChange([...education, newEducation]);
  };

  const removeEducation = (index: number) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    onChange(newEducation);
  };

  const handleEnhanceDescription = async (index: number) => {
      const { showToast } = useToast();
    const description = education[index].description;
    if (!description.trim()) {
      showToast('Please enter a description first.', 'error');
      return;
    }

    try {
      const result = await AIChatSession.sendMessage(
        `Enhance the following education description for a resume in 2-3 concise sentences:\n\n"${description}"\n\nRespond only in JSON format like this:\n{"enhancedDescription": "Your improved description here."}`
      );

      // 🌐 Fix response path based on Gemini structure
      const rawText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      let enhanced = '';
      try {
        const parsed = JSON.parse(rawText);
        if (Array.isArray(parsed.enhancedDescription)) {
          enhanced = parsed.enhancedDescription.join(' ');
        } else {
          enhanced = parsed.enhancedDescription?.trim?.() || '';
        }
      } catch (err) {
        console.error('JSON parse error:', err);
        showToast('Failed to parse AI response.', 'error');
        return;
      }

      if (!enhanced) {
        showToast('AI response was empty.', 'error');
        return;
      }

      handleChange(index, 'description', enhanced);
      showToast('Education description enhanced successfully.', 'success');
    } catch (error) {
      console.error('Enhance error:', error);
      showToast('Failed to enhance description. Please try again.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Education</h3>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus size={16} className="mr-1" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No education entries yet. Click "Add Education" to add your first entry.
        </p>
      ) : (
        education.map((edu, index) => (
          <div key={edu.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-800">
                {edu.institution || `Education Entry ${index + 1}`}
              </h4>
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <FormField
              label="Institution"
              id={`institution-${index}`}
              value={edu.institution}
              onChange={(e) => handleChange(index, 'institution', e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Degree"
                id={`degree-${index}`}
                value={edu.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
              />
              <FormField
                label="Field of Study"
                id={`fieldOfStudy-${index}`}
                value={edu.fieldOfStudy}
                onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Start Date"
                id={`startDate-${index}`}
                value={edu.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="e.g., Sep 2018"
              />
              <FormField
                label="End Date"
                id={`endDate-${index}`}
                value={edu.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                placeholder="e.g., May 2022 or Present"
              />
            </div>

            <TextareaField
              label="Description"
              id={`description-${index}`}
              value={edu.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              rows={3}
              placeholder="Add relevant details about your education, achievements, etc."
            />

            <button
        type="button"
        onClick={() => handleEnhanceDescription(index)}
        className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:from-purple-600 hover:to-blue-600 focus:outline-none"
      >
        Enhance with AI
      </button>
          </div>
        ))
      )}
    </div>
  );
};

export default EducationForm;