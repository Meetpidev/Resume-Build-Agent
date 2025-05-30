import React from 'react';
import { templates } from '../../data/templateData';
import { Template } from '../../types/templates';
import { Eye } from 'lucide-react';

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Templates</h2>
        <p className="text-gray-600">Choose a template to get started with your professional resume.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
              <img 
                src={template.thumbnail} 
                alt={template.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() => onSelectTemplate(template)}
                  className="bg-white/90 text-gray-900 px-4 py-2 rounded-full flex items-center gap-2 font-medium hover:bg-white transition-colors"
                >
                  <Eye size={18} />
                  Use This Template
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900">{template.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{template.description}</p>
              <div className="flex mt-4 gap-2">
                <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: template.colors.primary }}></span>
                <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: template.colors.secondary }}></span>
                <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: template.colors.accent }}></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;