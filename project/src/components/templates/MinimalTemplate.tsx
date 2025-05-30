import React from 'react';
import { ResumeData } from '../../types/resume';
import { Template } from '../../types/templates';

interface MinimalTemplateProps {
  resumeData: ResumeData;
  template: Template;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ resumeData, template }) => {
  const { personalInfo, summary, education, experience, skillGroups, projects, languages } = resumeData;
  const { colors } = template;

  return (
    <div className="p-8 font-sans max-w-4xl mx-auto" style={{ color: colors.text, backgroundColor: colors.background }}>
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-lg" style={{ color: colors.secondary }}>
          {personalInfo.jobTitle}
        </p>
        
        <div className="flex flex-wrap mt-2 text-sm" style={{ color: colors.secondary }}>
          <span className="mr-3">{personalInfo.email}</span>
          <span className="mr-3">{personalInfo.phone}</span>
          <span className="mr-3">{personalInfo.location}</span>
          {personalInfo.website && <span className="mr-3">{personalInfo.website}</span>}
          {personalInfo.linkedin && <span className="mr-3">{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <p>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-medium mb-3" style={{ color: colors.primary }}>
            Experience
          </h2>
          
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{exp.position}</h3>
                    <p style={{ color: colors.secondary }}>{exp.company}</p>
                  </div>
                  <p className="text-sm" style={{ color: colors.secondary }}>
                    {exp.startDate} — {exp.endDate}
                  </p>
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
          <h2 className="text-lg font-medium mb-3" style={{ color: colors.primary }}>
            Education
          </h2>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <p style={{ color: colors.secondary }}>{edu.institution}</p>
                  </div>
                  <p className="text-sm" style={{ color: colors.secondary }}>
                    {edu.startDate} — {edu.endDate}
                  </p>
                </div>
                <p className="mt-1 text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Two column layout for skills and other sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-medium mb-3\" style={{ color: colors.primary }}>
                Projects
              </h2>
              
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{project.name}</h3>
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
                      <p className="mt-1 text-xs" style={{ color: colors.secondary }}>
                        {project.technologies.join(' • ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        <div>
          {/* Skills */}
          {skillGroups.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-medium mb-3\" style={{ color: colors.primary }}>
                Skills
              </h2>
              
              <div className="space-y-3">
                {skillGroups.map((group) => (
                  <div key={group.id}>
                    <h3 className="font-medium text-sm">{group.name}</h3>
                    <div className="mt-1">
                      {group.skills.map((skill, index) => (
                        <React.Fragment key={skill.id}>
                          <span>{skill.name}</span>
                          {index < group.skills.length - 1 && <span className="mx-1">•</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-lg font-medium mb-3" style={{ color: colors.primary }}>
                Languages
              </h2>
              
              <div>
                {languages.map((language, index) => (
                  <React.Fragment key={language.id}>
                    <span>
                      <span className="font-medium">{language.name}</span>{' '}
                      <span className="text-sm" style={{ color: colors.secondary }}>
                        ({language.proficiency})
                      </span>
                    </span>
                    {index < languages.length - 1 && <span className="mx-1">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;