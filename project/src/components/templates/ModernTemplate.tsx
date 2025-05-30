import React from 'react';
import { ResumeData } from '../../types/resume';
import { Template } from '../../types/templates';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ModernTemplateProps {
  resumeData: ResumeData;
  template: Template;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resumeData, template }) => {
  const { personalInfo, summary, education, experience, skillGroups, projects, languages } = resumeData;
  const { colors } = template;

  return (
    <div className="p-8 font-sans max-w-4xl mx-auto" style={{ color: colors.text }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-xl mb-4" style={{ color: colors.secondary }}>
          {personalInfo.jobTitle}
        </h2>
        
        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail size={14} style={{ color: colors.primary }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone size={14} style={{ color: colors.primary }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} style={{ color: colors.primary }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm mt-2">
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe size={14} style={{ color: colors.primary }} />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin size={14} style={{ color: colors.primary }} />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github size={14} style={{ color: colors.primary }} />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: colors.primary, color: colors.primary }}>
            Professional Summary
          </h3>
          <p>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: colors.primary, color: colors.primary }}>
            Work Experience
          </h3>
          
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{exp.position}</h4>
                    <div className="text-gray-700">{exp.company}</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} — {exp.endDate}
                  </div>
                </div>
                <p className="mt-1 text-sm">{exp.description}</p>
                {exp.highlights.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                    {exp.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: colors.primary, color: colors.primary }}>
            Education
          </h3>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</h4>
                    <div className="text-gray-700">{edu.institution}</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {edu.startDate} — {edu.endDate}
                  </div>
                </div>
                <p className="mt-1 text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skillGroups.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: colors.primary, color: colors.primary }}>
            Skills
          </h3>
          
          <div className="space-y-3">
            {skillGroups.map((group) => (
              <div key={group.id}>
                <h4 className="font-medium text-gray-700">{group.name}</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="px-2 py-1 rounded text-sm"
                      style={{
                        backgroundColor: `${colors.primary}20`,
                        color: colors.primary,
                      }}
                    >
                      {skill.name} {skill.level && '•'} {skill.level && '★'.repeat(skill.level)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: colors.primary, color: colors.primary }}>
            Projects
          </h3>
          
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">{project.name}</h4>
                  {project.link && (
                    <a
                      href="#"
                      className="text-sm"
                      style={{ color: colors.primary }}
                    >
                      {project.link}
                    </a>
                  )}
                </div>
                <p className="mt-1 text-sm">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${colors.accent}20`,
                          color: colors.accent,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: colors.primary, color: colors.primary }}>
            Languages
          </h3>
          
          <div className="flex flex-wrap gap-4">
            {languages.map((language) => (
              <div key={language.id} className="flex items-center gap-2">
                <span className="font-medium">{language.name}:</span>
                <span className="text-sm text-gray-700 capitalize">{language.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;