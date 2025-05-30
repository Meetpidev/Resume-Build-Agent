import React from 'react';
import { ResumeData } from '../../types/resume';
import { Template } from '../../types/templates';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ClassicTemplateProps {
  resumeData: ResumeData;
  template: Template;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ resumeData, template }) => {
  const { personalInfo, summary, education, experience, skillGroups, projects, languages } = resumeData;
  const { colors } = template;

  return (
    <div className="p-8 font-serif max-w-4xl mx-auto" style={{ color: colors.text, backgroundColor: colors.background }}>
      {/* Header */}
      <header className="text-center mb-6 pb-4 border-b-2" style={{ borderColor: colors.secondary }}>
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-1" style={{ color: colors.primary }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-xl mb-4 italic" style={{ color: colors.secondary }}>
          {personalInfo.jobTitle}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm">
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
          <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-center" style={{ color: colors.primary }}>
            Profile
          </h3>
          <p className="text-center">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-center" style={{ color: colors.primary }}>
            Professional Experience
          </h3>
          
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="pb-4 border-b" style={{ borderColor: `${colors.secondary}30` }}>
                <div className="mb-2">
                  <h4 className="font-bold text-lg">{exp.position}</h4>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold" style={{ color: colors.secondary }}>{exp.company}</span>
                    <span className="text-sm italic">{exp.startDate} — {exp.endDate}</span>
                  </div>
                </div>
                <p className="mb-2">{exp.description}</p>
                {exp.highlights.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 pl-2">
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
          <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-center" style={{ color: colors.primary }}>
            Education
          </h3>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="pb-3 border-b" style={{ borderColor: `${colors.secondary}30` }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{edu.degree} in {edu.fieldOfStudy}</h4>
                    <div style={{ color: colors.secondary }}>{edu.institution}</div>
                  </div>
                  <div className="text-sm italic">
                    {edu.startDate} — {edu.endDate}
                  </div>
                </div>
                <p className="mt-1">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills */}
        {skillGroups.length > 0 && (
          <section>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-center\" style={{ color: colors.primary }}>
              Skills
            </h3>
            
            <div className="space-y-3">
              {skillGroups.map((group) => (
                <div key={group.id} className="mb-3">
                  <h4 className="font-semibold mb-1" style={{ color: colors.secondary }}>{group.name}</h4>
                  <ul className="list-inside">
                    {group.skills.map((skill) => (
                      <li key={skill.id} className="mb-1">
                        {skill.name}
                        {skill.level && (
                          <span className="ml-2 text-sm\" style={{ color: colors.accent }}>
                            {Array(skill.level).fill('•').join(' ')}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="space-y-6">
          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-center\" style={{ color: colors.primary }}>
                Projects
              </h3>
              
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="mb-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">{project.name}</h4>
                      {project.link && (
                        <a
                          href="#"
                          className="text-sm"
                          style={{ color: colors.accent }}
                        >
                          {project.link}
                        </a>
                      )}
                    </div>
                    <p className="mt-1 text-sm">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="mt-1 text-sm italic" style={{ color: colors.secondary }}>
                        {project.technologies.join(', ')}
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
              <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-center" style={{ color: colors.primary }}>
                Languages
              </h3>
              
              <ul className="list-inside space-y-1">
                {languages.map((language) => (
                  <li key={language.id}>
                    <span className="font-medium">{language.name}:</span>{' '}
                    <span className="capitalize" style={{ color: colors.secondary }}>
                      {language.proficiency}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassicTemplate;