import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm: React.FC = () => {
  const { state, updateSection, nextStep, prevStep } = useResume();
  const navigate = useNavigate();

  const [education, setEducation] = useState(
    state.data.education.length ? state.data.education : [createEmptyEducation()]
  );

  function createEmptyEducation() {
    return {
      id: uuidv4(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
  }

  const handleChange = (index: number, field: string, value: string | boolean) => {
    setEducation(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
        ...(field === 'current' && value === true ? { endDate: '' } : {}),
      };
      return updated;
    });
  };

  const addEducation = () => setEducation([...education, createEmptyEducation()]);
  const removeEducation = (index: number) => {
    if (education.length === 1) return;
    const updated = [...education];
    updated.splice(index, 1);
    setEducation(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = education.filter(e => e.degree && e.institution && e.startDate);
    if (!cleaned.length) return alert('Please add at least one valid education entry.');
    updateSection('education', cleaned);
    nextStep();
    navigate('/builder/skills');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Education</h2>

      {education.map((edu, index) => (
        <div
          key={edu.id}
          className="border border-gray-300 rounded-2xl p-4 shadow-sm space-y-4 relative bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Degree (e.g., B.Sc. Computer Science)"
              value={edu.degree}
              onChange={(e) => handleChange(index, 'degree', e.target.value)}
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => handleChange(index, 'institution', e.target.value)}
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={edu.location}
              onChange={(e) => handleChange(index, 'location', e.target.value)}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={edu.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              className="input input-bordered w-full"
            />
            <input
              type="month"
              placeholder="Start Date"
              value={edu.startDate}
              onChange={(e) => handleChange(index, 'startDate', e.target.value)}
              className="input input-bordered w-full"
              required
            />
            {!edu.current && (
              <input
                type="month"
                placeholder="End Date"
                value={edu.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                className="input input-bordered w-full"
              />
            )}
            <label className="flex items-center gap-2 col-span-2">
              <input
                type="checkbox"
                checked={edu.current}
                onChange={(e) => handleChange(index, 'current', e.target.checked)}
              />
              Currently Studying
            </label>
          </div>

          {education.length > 1 && (
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <Plus size={18} /> Add Education
      </button>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => {
            prevStep();
            navigate('/builder/experience');
          }}
          className="btn"
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary">
          Next: Skills
        </button>
      </div>
    </form>
  );
};

export default EducationForm;
