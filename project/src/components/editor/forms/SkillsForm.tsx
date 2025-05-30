import React from 'react';
import { SkillGroup, Skill } from '../../../types/resume';
import FormField from '../../ui/FormField';
import { Plus, Trash2, PlusCircle, MinusCircle } from 'lucide-react';

interface SkillsFormProps {
  skillGroups: SkillGroup[];
  onChange: (skillGroups: SkillGroup[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skillGroups, onChange }) => {

  const handleGroupChange = (index: number, name: string) => {
    const newGroups = [...skillGroups];
    newGroups[index] = { ...newGroups[index], name };
    onChange(newGroups);
  };


  const handleSkillChange = (groupIndex: number, skillIndex: number, field: keyof Skill, value: any) => {
    const newGroups = [...skillGroups];
    newGroups[groupIndex].skills[skillIndex] = {
      ...newGroups[groupIndex].skills[skillIndex],
      [field]: field === 'level' ? parseInt(value, 10) : value,
    };
    onChange(newGroups);
  };

  const addSkillGroup = () => {
    const newGroup: SkillGroup = {
      id: `sg-${Date.now()}`,
      name: '',
      skills: [{ id: `skill-${Date.now()}`, name: '', level: 3 }],
    };
    onChange([...skillGroups, newGroup]);
  };

  const removeSkillGroup = (index: number) => {
    const newGroups = [...skillGroups];
    newGroups.splice(index, 1);
    onChange(newGroups);
  };

  const addSkill = (groupIndex: number) => {
    const newGroups = [...skillGroups];
    newGroups[groupIndex].skills.push({
      id: `skill-${Date.now()}`,
      name: '',
      level: 3,
    });
    onChange(newGroups);
  };

  const removeSkill = (groupIndex: number, skillIndex: number) => {
    const newGroups = [...skillGroups];
    newGroups[groupIndex].skills.splice(skillIndex, 1);
    onChange(newGroups);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Skills</h3>
        <button
          type="button"
          onClick={addSkillGroup}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus size={16} className="mr-1" />
          Add Skill Category
        </button>
      </div>

      {skillGroups.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No skill categories yet. Click "Add Skill Category" to add your first category.
        </p>
      ) : (
        skillGroups.map((group, groupIndex) => (
          <div key={group.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <FormField
                label="Category Name"
                id={`group-${groupIndex}`}
                value={group.name}
                onChange={(e) => handleGroupChange(groupIndex, e.target.value)}
                placeholder="e.g., Programming Languages, Design Tools, Soft Skills"
                className="flex-grow mr-2"
              />
              <button
                type="button"
                onClick={() => removeSkillGroup(groupIndex)}
                className="mt-5 text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {group.skills.map((skill, skillIndex) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <div className="flex-grow">
                    <FormField
                      label={skillIndex === 0 ? "Skill" : ""}
                      id={`skill-${groupIndex}-${skillIndex}`}
                      value={skill.name}
                      onChange={(e) =>
                        handleSkillChange(groupIndex, skillIndex, 'name', e.target.value)
                      }
                      placeholder={`e.g., ${skillIndex === 0 ? 'JavaScript, Photoshop, Leadership' : ''}`}
                    />
                  </div>
                  <div className="w-32">
                    <label
                      className={`block text-sm font-medium text-gray-700 ${
                        skillIndex === 0 ? '' : 'invisible'
                      }`}
                    >
                      Level
                    </label>
                    <select
                      value={skill.level}
                      onChange={(e) =>
                        handleSkillChange(
                          groupIndex,
                          skillIndex,
                          'level',
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value={1}>Beginner</option>
                      <option value={2}>Basic</option>
                      <option value={3}>Intermediate</option>
                      <option value={4}>Advanced</option>
                      <option value={5}>Expert</option>
                    </select>
                  </div>
                  {group.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(groupIndex, skillIndex)}
                      className="mt-1 text-red-600 hover:text-red-800"
                    >
                      <MinusCircle size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addSkill(groupIndex)}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <PlusCircle size={16} className="mr-1" />
                Add Skill
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SkillsForm;