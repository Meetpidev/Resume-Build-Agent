import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const { state, updateSection, nextStep, prevStep } = useResume();
  const navigate = useNavigate();

  const [skills, setSkills] = useState<string[]>(state.data.skills || ['']);

  const handleSkillChange = (index: number, value: string) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const addSkill = () => setSkills([...skills, '']);

  const removeSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated.length ? updated : ['']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = skills.filter(skill => skill.trim());
    if (!cleaned.length) return alert('Add at least one skill.');
    updateSection('skills', cleaned);
    nextStep();
    navigate('/builder/certifications');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>

      {skills.map((skill, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
            placeholder="e.g. JavaScript"
            className="input input-bordered w-full"
            required
          />
          <button
            type="button"
            onClick={() => removeSkill(index)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSkill}
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <Plus size={18} /> Add Skill
      </button>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => {
            prevStep();
            navigate('/builder/education');
          }}
          className="btn"
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary">
          Next: Certifications
        </button>
      </div>
    </form>
  );
};

export default SkillsForm;
