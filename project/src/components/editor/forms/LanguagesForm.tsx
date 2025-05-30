import React from 'react';
import { Language } from '../../../types/resume';
import FormField from '../../ui/FormField';
import { Plus, Trash2 } from 'lucide-react';

interface LanguagesFormProps {
  languages: Language[];
  onChange: (languages: Language[]) => void;
}

const proficiencyOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'fluent', label: 'Fluent' },
  { value: 'native', label: 'Native' },
];

const LanguagesForm: React.FC<LanguagesFormProps> = ({ languages, onChange }) => {
  const handleChange = (index: number, field: keyof Language, value: string) => {
    const newLanguages = [...languages];
    newLanguages[index] = {
      ...newLanguages[index],
      [field]: field === 'proficiency' ? value as any : value,
    };
    onChange(newLanguages);
  };

  const addLanguage = () => {
    const newLanguage: Language = {
      id: `lang-${Date.now()}`,
      name: '',
      proficiency: 'intermediate',
    };
    onChange([...languages, newLanguage]);
  };

  const removeLanguage = (index: number) => {
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    onChange(newLanguages);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Languages</h3>
        <button
          type="button"
          onClick={addLanguage}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus size={16} className="mr-1" />
          Add Language
        </button>
      </div>

      {languages.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No languages yet. Click "Add Language" to add your first language.
        </p>
      ) : (
        languages.map((language, index) => (
          <div key={language.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <FormField
                  label="Language"
                  id={`language-${index}`}
                  value={language.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  placeholder="e.g., English, Spanish, French"
                />
              </div>
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proficiency
                </label>
                <select
                  value={language.proficiency}
                  onChange={(e) => handleChange(index, 'proficiency', e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {proficiencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end h-full pb-1">
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LanguagesForm;