import React from 'react';
import { ResumeData } from '../../types/resume';
import { Template } from '../../types/templates';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface CreativeTemplateProps {
  resumeData: ResumeData;
  template: Template;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ resumeData, template }) => {
  const { personalInfo, summary, education, experience, skillGroups, projects, languages } = resumeData;
  const { colors } = template;

  const sidebarBgColor = colors.primary;
  const sidebarTextColor = '#ffffff';

  return (
    <div className="font-sans max-w-4xl mx-auto" style={{ color: colors.text }}>
      {/* Header with accent color */}
      <header className="p-6" style={{ backgroundColor: colors.accent, color: '#ffffff' }}>
        <h1 className="text-3xl font-bold mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-xl opacity-90">
          {personalInfo.jobTitle}
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Sidebar */}
        <div className="p-6" style={{ backgroundColor: sidebarBgColor, color: sidebarTextColor }}>
          {/* Contact */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4 pb-1 border-b border-white/30">
              Contact
            </h3>
            
            <div className="space-y-2">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} className="opacity-80" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} className="opacity-80" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="opacity-80" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe size={16} className="opacity-80" />
                  <span>{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin size={16} className="opacity-80" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-2">
                  <Github size={16} className="opacity-80" />
                  <span>{personalInfo.github}</span>
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          {skillGroups.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4 pb-1 border-b border-white/30">
                Skills
              </h3>
              
              <div className="space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.id}>
                    <h4 className="font-medium mb-2">{group.name}</h4>
                    <div className="space-y-2">
                      {group.skills.map((skill) => (
                        <div key={skill.id} className="w-full">
                          <div className="flex justify-between mb-1">
                            <span>{skill.name}</span>
                            <span className="text-xs opacity-80">
                              {['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}
                            </span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full"
                              style={{
                                width: `${skill.level * 20}%`,
                                backgroundColor: colors.accent,
                              }}
                            ></div>
                          </div>
                        </div>
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
              <h3 className="text-lg font-semibold mb-4 pb-1 border-b border-white/30">
                Languages
              </h3>
              
              <div className="space-y-2">
                {languages.map((language) => (
                  <div key={language.id} className="flex justify-between">
                    <span>{language.name}</span>
                    <span className="capitalize opacity-80">{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Main Content */}
        <div className="p-6 md:col-span-2">
          {/* Summary */}
          {summary && (
            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-3\" style={{ color: colors.primary }}>
                About Me
              </h3>
              <p>{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                Work Experience
              </h3>
              
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2" style={{ borderColor: colors.secondary }}>
                    <div
                      className="absolute w-3 h-3 rounded-full -left-[7px] top-1"
                      style={{ backgroundColor: colors.accent }}
                    ></div>
                    <div className="mb-1">
                      <h4 className="font-semibold text-lg">{exp.position}</h4>
                      <div className="flex justify-between items-center">
                        <span style={{ color: colors.secondary }}>{exp.company}</span>
                        <span className="text-sm" style={{ color: colors.secondary }}>
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{exp.description}</p>
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
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                Education
              </h3>
              
              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-6 border-l-2" style={{ borderColor: colors.secondary }}>
                    <div
                      className="absolute w-3 h-3 rounded-full -left-[7px] top-1"
                      style={{ backgroundColor: colors.accent }}
                    ></div>
                    <div className="mb-1">
                      <h4 className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</h4>
                      <div className="flex justify-between items-center">
                        <span style={{ color: colors.secondary }}>{edu.institution}</span>
                        <span className="text-sm" style={{ color: colors.secondary }}>
                          {edu.startDate} — {edu.endDate}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                Projects
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-md"
                    style={{ backgroundColor: `${colors.primary}10` }}
                  >
                    <div className="flex justify-between items-start mb-2">
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
                    <p className="text-sm mb-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: colors.accent,
                              color: '#ffffff',
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
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;