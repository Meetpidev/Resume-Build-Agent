import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import { useToast } from '../ui/Toast';
import { Experience } from '../../types/resume';
import { Info, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { AIChatSession } from '../../services/AImodels';

const ExperienceForm: React.FC = () => {
  const { state, updateSection, nextStep, prevStep } = useResume();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [experiences, setExperiences] = useState<Experience[]>(
    state.data.experience.length > 0 
      ? state.data.experience 
      : [createEmptyExperience()]
  );
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  function createEmptyExperience(): Experience {
    return {
      id: uuidv4(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
  }

  const handleChange = (index: number, field: keyof Experience, value: string | boolean) => {
    setExperiences(prevExperiences => {
      const updated = [...prevExperiences];
      updated[index] = { 
        ...updated[index], 
        [field]: value,
        // Clear end date if current is true
        ...(field === 'current' && value === true ? { endDate: '' } : {})
      };
      return updated;
    });
  };

  const handleAchievementChange = (experienceIndex: number, achievementIndex: number, value: string) => {
    setExperiences(prevExperiences => {
      const updated = [...prevExperiences];
      const achievements = [...updated[experienceIndex].achievements];
      achievements[achievementIndex] = value;
      updated[experienceIndex] = { ...updated[experienceIndex], achievements };
      return updated;
    });
  };

  const addAchievement = (experienceIndex: number) => {
    setExperiences(prevExperiences => {
      const updated = [...prevExperiences];
      updated[experienceIndex] = {
        ...updated[experienceIndex],
        achievements: [...updated[experienceIndex].achievements, '']
      };
      return updated;
    });
  };

  const removeAchievement = (experienceIndex: number, achievementIndex: number) => {
    if (experiences[experienceIndex].achievements.length <= 1) {
      // Don't remove the last achievement, just clear it
      handleAchievementChange(experienceIndex, achievementIndex, '');
      return;
    }

    setExperiences(prevExperiences => {
      const updated = [...prevExperiences];
      const achievements = updated[experienceIndex].achievements.filter(
        (_, i) => i !== achievementIndex
      );
      updated[experienceIndex] = { ...updated[experienceIndex], achievements };
      return updated;
    });
  };

  const addExperience = () => {
    setExperiences(prev => [...prev, createEmptyExperience()]);
    setExpandedIndex(experiences.length); // Expand the new experience
  };

  const removeExperience = (index: number) => {
    if (experiences.length <= 1) {
      // Don't remove the last experience, just clear it
      setExperiences([createEmptyExperience()]);
      return;
    }

    setExperiences(prev => prev.filter((_, i) => i !== index));
    
    // Adjust expanded index if needed
    if (expandedIndex >= index && expandedIndex > 0) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  const validateExperience = (experience: Experience): boolean => {
    // Required fields: title, company, startDate
    return !!(experience.title && experience.company && experience.startDate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty achievements
    const cleanedExperiences = experiences.map(exp => ({
      ...exp,
      achievements: exp.achievements.filter(achievement => achievement.trim() !== '')
    }));

    // Validate at least one experience has the required fields
    const validExperiences = cleanedExperiences.filter(validateExperience);
    
    if (validExperiences.length === 0) {
      showToast('Please add at least one experience with job title, company, and start date', 'error');
      return;
    }
    
    updateSection('experience', validExperiences);
    nextStep();
    navigate('/builder/education');
  };

  const handleBack = () => {
    // Save current state before navigating
    updateSection('experience', experiences);
    prevStep();
    navigate('/builder');
  };

  const GenerateSummaryFromAI = async (index: number) => {
    const experience = experiences[index];
  if (!experience.description) return showToast("experience is empty","error");
  try {
    const experience = experiences[index];

    const prompt = `Enhance the following resume bullet points for clarity, impact, and grammar. Return the result as a JSON array in this format:
{
  "points": [
    "Improved bullet point 1",
    "Enhanced bullet point 2"
  ]
}

Original bullet points:
${experience.description || experience.achievements.join("\n")}`;

    const result = await AIChatSession.sendMessage(prompt);
    const rawText = await result.response.text();

    const parsed = JSON.parse(rawText);
    const bulletPoints = parsed?.points;

    if (!bulletPoints || !Array.isArray(bulletPoints)) {
      throw new Error("Invalid format: Missing 'points' array");
    }

    const enhancedDescription = bulletPoints.join("\n");

    setExperiences(prev => {
      const updated = [...prev];
      updated[index].description = enhancedDescription;
      return updated;
    });

    showToast("Job description enhanced!", "success");

  } catch (error) {
    console.error("Error enhancing description:", error);
    showToast("Failed to enhance job description.", "error");
  }
};

  

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Work Experience</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Highlight your most relevant work experiences. Focus on achievements and responsibilities that demonstrate your skills. Use bullet points for key accomplishments.
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {experiences.map((experience, index) => (
          <div key={experience.id} className="mb-8 bg-gray-50 p-4 rounded-md">
            <div 
              className="flex justify-between items-center cursor-pointer mb-4"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {experience.title || experience.company 
                    ? `${experience.title || 'Position'} at ${experience.company || 'Company'}`
                    : `Experience ${index + 1}`}
                </h3>
                {expandedIndex !== index && (
                  <p className="text-sm text-gray-500 mt-1">
                    {experience.startDate && (
                      <>
                        {experience.startDate}
                        {experience.current 
                          ? ' - Present' 
                          : experience.endDate ? ` - ${experience.endDate}` : ''}
                      </>
                    )}
                  </p>
                )}
              </div>
              <div className="flex items-center">
                <button 
                  type="button" 
                  className="p-1 text-red-500 hover:bg-red-50 rounded-md mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeExperience(index);
                  }}
                >
                  <Trash2 size={18} />
                </button>
                {expandedIndex === index ? (
                  <ChevronUp className="text-gray-500" size={20} />
                ) : (
                  <ChevronDown className="text-gray-500" size={20} />
                )}
              </div>
            </div>
            
            {expandedIndex === index && (
              <div className="mt-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      id={`title-${index}`}
                      value={experience.title}
                      onChange={(e) => handleChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Software Engineer"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Company *
                    </label>
                    <input
                      type="text"
                      id={`company-${index}`}
                      value={experience.company}
                      onChange={(e) => handleChange(index, 'company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Acme Corporation"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id={`location-${index}`}
                    value={experience.location}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <input
                      type="month"
                      id={`startDate-${index}`}
                      value={experience.startDate}
                      onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <div className="space-y-2">
                      <input
                        type="month"
                        id={`endDate-${index}`}
                        value={experience.endDate}
                        onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={experience.current}
                      />
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`current-${index}`}
                          checked={experience.current}
                          onChange={(e) => handleChange(index, 'current', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`current-${index}`} className="ml-2 block text-sm text-gray-700">
                          I currently work here
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className='flex'>
                  <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description
                  </label>
                  <button
  type="button"
  onClick={() => GenerateSummaryFromAI(index)}
  className="relative ml-[18rem] inline-flex items-center justify-center px-6 py-2 overflow-hidden text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:from-purple-600 hover:to-blue-600 focus:outline-none"
>
  ✨ Generate Description with AI
</button>
                    </div>
                  <textarea
                    id={`description-${index}`}
                    value={experience.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Briefly describe your role and responsibilities"
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Achievements
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Add bullet points highlighting specific accomplishments, metrics, or contributions
                  </p>
                  
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex items-center mb-2">
                      <div className="mr-2 text-gray-400">•</div>
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => handleAchievementChange(index, achievementIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Increased website performance by 40%"
                      />
                      <button
                        type="button"
                        onClick={() => removeAchievement(index, achievementIndex)}
                        className="ml-2 p-1.5 text-red-500 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addAchievement(index)}
                    className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Plus size={16} className="mr-1" /> Add Achievement
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addExperience}
          className="mb-6 w-full py-2 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Plus size={20} className="mr-2" /> Add Another Experience
        </button>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next: Education
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;