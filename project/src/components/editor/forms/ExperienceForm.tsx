import React from 'react';
import { Experience } from '../../../types/resume';
import FormField from '../../ui/FormField';
import TextareaField from '../../ui/TextareaField';
import { Plus, Trash2, PlusCircle, MinusCircle } from 'lucide-react';
import { useToast } from '../../ui/Toast';
import { AIChatSession } from '../../../services/AImodels';

interface ExperienceFormProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience, onChange }) => {
  const { showToast } = useToast(); 
  const handleChange = (index: number, field: keyof Experience, value: string | string[]) => {
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onChange(newExperience);
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      highlights: [''],
    };
    onChange([...experience, newExperience]);
  };

  const removeExperience = (index: number) => {
    const newExperience = [...experience];
    newExperience.splice(index, 1);
    onChange(newExperience);
  };

  const addHighlight = (expIndex: number) => {
    const newExperience = [...experience];
    newExperience[expIndex].highlights.push('');
    onChange(newExperience);
  };

  const removeHighlight = (expIndex: number, highlightIndex: number) => {
    const newExperience = [...experience];
    newExperience[expIndex].highlights.splice(highlightIndex, 1);
    onChange(newExperience);
  };

  const updateHighlight = (expIndex: number, highlightIndex: number, value: string) => {
    const newExperience = [...experience];
    newExperience[expIndex].highlights[highlightIndex] = value;
    onChange(newExperience);
  };

 const enhanceDescription = async (index: number) => {
  const description = experience[index].description;
  if (!description.trim()) {
    showToast('Please enter a description first.', 'error');
    return;
  }

  try {
    const result = await AIChatSession.sendMessage(
      `Enhance the following job experience description for a resume in 2-3 concise sentences:\n\n"${description}"\n\nRespond only in JSON format like this:\n{"enhancedDescription": "Your improved description here."}`
    );

    const rawText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    let enhanced = '';
    try {
      const parsed = JSON.parse(rawText);
      enhanced = Array.isArray(parsed.enhancedDescription)
        ? parsed.enhancedDescription.join(' ')
        : parsed.enhancedDescription?.trim() || '';
    } catch (err) {
      console.error('Parse error:', err);
      showToast('Failed to parse AI response.', 'error');
      return;
    }

    if (!enhanced) {
      showToast('AI returned an empty response.', 'error');
      return;
    }

    const updated = [...experience];
    updated[index].description = enhanced;
    onChange(updated);
    showToast('Description enhanced successfully!', 'success');
  } catch (error) {
    console.error('AI error:', error);
    showToast('Failed to enhance description.', 'error');
  }
};


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus size={16} className="mr-1" />
          Add Experience
        </button>
        
      </div>

      {experience.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No work experience entries yet. Click "Add Experience" to add your first entry.
        </p>
      ) : (
        experience.map((exp, index) => (
          <div key={exp.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-800">
                {exp.company || `Work Experience ${index + 1}`}
              </h4>
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Company"
                id={`company-${index}`}
                value={exp.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
              />
              <FormField
                label="Position"
                id={`position-${index}`}
                value={exp.position}
                onChange={(e) => handleChange(index, 'position', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Start Date"
                id={`startDate-${index}`}
                value={exp.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="e.g., Jan 2020"
              />
              <FormField
                label="End Date"
                id={`endDate-${index}`}
                value={exp.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                placeholder="e.g., Dec 2022 or Present"
              />
            </div>

            <TextareaField
              label="Description"
              id={`description-${index}`}
              value={exp.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              rows={2}
              placeholder="Brief overview of your role and responsibilities"
            />
<button
  type="button"
  onClick={() => enhanceDescription(index)}
  className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:from-purple-600 hover:to-blue-600 focus:outline-none"
>
  Enhance Description with AI
</button>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Key Achievements/Responsibilities
                </label>
                <button
                  type="button"
                  onClick={() => addHighlight(index)}
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <PlusCircle size={16} className="mr-1" />
                  Add Bullet Point
                </button>
              </div>

              {exp.highlights.map((highlight, highlightIndex) => (
                <div key={highlightIndex} className="flex items-start gap-2">
                  <textarea
                    value={highlight}
                    onChange={(e) => updateHighlight(index, highlightIndex, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                    placeholder={`Achievement ${highlightIndex + 1}`}
                  />
                  {exp.highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHighlight(index, highlightIndex)}
                      className="mt-2 text-red-600 hover:text-red-800"
                    >
                      <MinusCircle size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExperienceForm;