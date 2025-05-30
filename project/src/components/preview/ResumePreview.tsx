import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

const Separator = () => (
  <hr className="border-t border-gray-300 my-6" />
);

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-3 py-1 rounded-full">
    {children}
  </span>
);

const ResumePreview: React.FC = () => {
  const { state } = useResume();
  const { personal, experience, education, skills, projects, certifications } = state.data;

  return (
    <div className="p-10 max-w-4xl mx-auto bg-white rounded-xl shadow-xl space-y-10 font-sans">
      {/* Personal Info Section */}
      <header className="text-center border-b border-gray-300 pb-6">
        <h1 className="text-5xl font-extrabold text-gray-900">{personal.name || 'Your Name'}</h1>
        <p className="text-2xl text-gray-700 mt-2">{personal.title || 'Professional Title'}</p>
        <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm text-gray-600 font-medium tracking-wide">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && (
            <a
              href={personal.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {personal.website}
            </a>
          )}
        </div>
        {personal.summary && (
          <p className="mt-6 text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            {personal.summary}
          </p>
        )}
      </header>

      {/* Experience Section */}
      {experience?.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Experience</h2>
          <Separator />
          {experience.map((exp) => (
            <div key={exp.id} className="mt-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                  <p className="text-gray-700 italic">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500 font-mono">
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.location && <p className="text-sm text-gray-500 italic mt-1">{exp.location}</p>}
              {exp.description && <p className="mt-3 text-gray-700 leading-relaxed">{exp.description}</p>}
              {exp.achievements?.length > 0 && (
                <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
                  {exp.achievements.filter(a => a.trim()).map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {education?.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Education</h2>
          <Separator />
          {education.map((edu) => (
            <div key={edu.id} className="mt-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-700 italic">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-500 font-mono">
                  {edu.startDate} — {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
              {edu.location && <p className="text-sm text-gray-500 italic mt-1">{edu.location}</p>}
              {edu.description && <p className="mt-3 text-gray-700 leading-relaxed">{edu.description}</p>}
              {edu.gpa && <p className="mt-1 text-sm text-gray-600 font-mono">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {skills?.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Skills</h2>
          <Separator />
          <div className="flex flex-wrap gap-3 mt-4">
            {skills.map((skill, index) => (
              <Badge key={index}>{skill}</Badge>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects?.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Projects</h2>
          <Separator />
          {projects.map((project) => (
            <div key={project.id} className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
              {project.description && <p className="mt-3 text-gray-700 leading-relaxed">{project.description}</p>}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block font-medium"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications Section */}
      {certifications?.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Certifications</h2>
          <Separator />
          {certifications.map((cert) => (
            <div key={cert.id} className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">{cert.name}</h3>
              <p className="text-gray-700 italic">{cert.issuer}</p>
              <p className="text-sm text-gray-500 font-mono">
                Issued: {cert.date}{cert.expiry && ` • Expires: ${cert.expiry}`}
              </p>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block font-medium"
                >
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
