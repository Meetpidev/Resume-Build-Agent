import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2 } from 'lucide-react';
import { AIChatSession } from '../../services/AImodels';
import { useToast } from '../ui/Toast';

const ProjectsForm: React.FC = () => {
  const { state, updateSection, nextStep, prevStep } = useResume();
  const navigate = useNavigate();
 const { showToast } = useToast();
  const [projects, setProjects] = useState(
    state.data.projects?.length ? state.data.projects : [createEmptyProject()]
  );

  function createEmptyProject() {
    return {
      id: uuidv4(),
      name: '',
      description: '',
      link: '',
    };
  }

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const addProject = () => {
    setProjects([...projects, createEmptyProject()]);
  };

  const removeProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated.length ? updated : [createEmptyProject()]);
  };

  const enhanceDescription = async (index: number) => {
  const project = projects[index];
  if (!project.description) return showToast("Description is empty","error");

  try {
    showToast('Enhancing description...', 'success');

    const result = await AIChatSession.sendMessage(`Enhance the following project description for a resume in 2-3 sentences and it should be in bullet points:\n\n"${project.description}"\n\nRespond only in JSON format like this:\n{"enhancedDescription": "Your improved description here."}`);

    const rawText = await result.response.text();

    let enhanced = '';
    try {
      const parsed = JSON.parse(rawText);
      enhanced = parsed.enhancedDescription?.trim() || '';
    } catch (err) {
      console.error('JSON parse error:', err);
      showToast('Failed to parse AI response.', "error");
      return;
    }

    if (!enhanced) {
      showToast('AI returned empty enhancement.', "error");
      return;
    }

    const updated = [...projects];
    updated[index].description = enhanced;
    setProjects(updated);

    showToast('Description enhanced!',"error");
  } catch (err) {
    console.error(err);
    showToast('Failed to enhance description.',"error");
  }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = projects.filter(p => p.name && p.description);
    if (!cleaned.length) return alert('Please add at least one valid project.');
    updateSection('projects', cleaned);
    nextStep();
    navigate('/builder/certifications');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Projects</h2>

      {projects.map((project, index) => (
        <div
          key={project.id}
          className="space-y-3 border border-gray-300 rounded-lg p-4 shadow-sm relative"
        >
          <button
            type="button"
            onClick={() => removeProject(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            title="Remove project"
          >
            <Trash2 size={18} />
          </button>

          <input
            type="text"
            placeholder="Project Name"
            value={project.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            className="input input-bordered w-full"
            required
          />
 
          <textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            className="textarea textarea-bordered w-full"
            rows={3}
            required
          />
           <button
  type="button"
  onClick={() => enhanceDescription(index)}
  className="relative ml-[25rem] inline-flex items-center justify-center px-6 py-2 overflow-hidden text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:from-purple-600 hover:to-blue-600 focus:outline-none"
>
  ✨ Enhance Description
</button>

          <input
            type="url"
            placeholder="Project Link (e.g., https://github.com/...)"
            value={project.link}
            onChange={(e) => handleChange(index, 'link', e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addProject}
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <Plus size={18} /> Add Project
      </button>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => {
            prevStep();
            navigate('/builder/skills');
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

export default ProjectsForm;
