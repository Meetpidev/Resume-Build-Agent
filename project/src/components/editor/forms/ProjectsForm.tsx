import React from 'react';
import { Project } from '../../../types/resume';
import FormField from '../../ui/FormField';
import TextareaField from '../../ui/TextareaField';
import { Plus, Trash2, X } from 'lucide-react';
import { useToast } from '../../ui/Toast';
import { AIChatSession } from '../../../services/AImodels';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, onChange }) => {
  const { showToast } = useToast(); 
  const handleChange = (index: number, field: keyof Project, value: string | string[]) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onChange(newProjects);
  };

  const addProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      technologies: [],
      link: '',
    };
    onChange([...projects, newProject]);
  };

  const removeProject = (index: number) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    onChange(newProjects);
  };

  const handleTechChange = (index: number, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(Boolean);
    handleChange(index, 'technologies', technologies);
  };

  const removeTech = (projectIndex: number, techIndex: number) => {
    const newProjects = [...projects];
    const newTechs = [...newProjects[projectIndex].technologies];
    newTechs.splice(techIndex, 1);
    newProjects[projectIndex].technologies = newTechs;
    onChange(newProjects);
  };

  const enhanceDescription = async (index: number) => {
  const description = projects[index].description;
  if (!description.trim()) {
    showToast('Please enter a description first.', 'error');
    return;
  }

  try {
    const result = await AIChatSession.sendMessage(
      `Enhance the following project description for a resume in 2-3 concise sentences and in bullet point:\n\n"${description}"\n\nRespond only in JSON format like this:\n{"enhancedDescription": "Your improved description here."}`
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

    const updated = [...projects];
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
        <h3 className="text-lg font-medium text-gray-900">Projects</h3>
        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus size={16} className="mr-1" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No projects yet. Click "Add Project" to add your first project.
        </p>
      ) : (
        projects.map((project, index) => (
          <div key={project.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-800">
                {project.name || `Project ${index + 1}`}
              </h4>
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <FormField
              label="Project Name"
              id={`name-${index}`}
              value={project.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
            />

            <TextareaField
              label="Description"
              id={`description-${index}`}
              value={project.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              rows={3}
            />
<button
  type="button"
  onClick={() => enhanceDescription(index)}
  className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:from-purple-600 hover:to-blue-600 focus:outline-none"
>
  Enhance Description with AI
</button>
            <FormField
              label="Link"
              id={`link-${index}`}
              value={project.link || ''}
              onChange={(e) => handleChange(index, 'link', e.target.value)}
              placeholder="e.g., github.com/username/project"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Technologies Used
              </label>
              
              <FormField
                id={`technologies-${index}`}
                value={project.technologies.join(', ')}
                onChange={(e) => handleTechChange(index, e.target.value)}
                placeholder="e.g., React, Node.js, MongoDB (comma separated)"
              />
              
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(index, techIndex)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectsForm;