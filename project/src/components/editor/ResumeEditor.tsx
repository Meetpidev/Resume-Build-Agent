import React from 'react';
import { ResumeData } from '../../types/resume';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SummaryForm from './forms/SummaryForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import LanguagesForm from './forms/LanguagesForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';

interface ResumeEditorProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ resumeData, setResumeData }) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="personal\" className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-7 mb-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-4">
          <PersonalInfoForm
            personalInfo={resumeData.personalInfo}
            onChange={(personalInfo) => setResumeData({ ...resumeData, personalInfo })}
          />
        </TabsContent>
        
        <TabsContent value="summary" className="space-y-4">
          <SummaryForm
            summary={resumeData.summary}
            onChange={(summary) => setResumeData({ ...resumeData, summary })}
          />
        </TabsContent>
        
        <TabsContent value="education" className="space-y-4">
          <EducationForm
            education={resumeData.education}
            onChange={(education) => setResumeData({ ...resumeData, education })}
          />
        </TabsContent>
        
        <TabsContent value="experience" className="space-y-4">
          <ExperienceForm
            experience={resumeData.experience}
            onChange={(experience) => setResumeData({ ...resumeData, experience })}
          />
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-4">
          <SkillsForm
            skillGroups={resumeData.skillGroups}
            onChange={(skillGroups) => setResumeData({ ...resumeData, skillGroups })}
          />
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-4">
          <ProjectsForm
            projects={resumeData.projects}
            onChange={(projects) => setResumeData({ ...resumeData, projects })}
          />
        </TabsContent>
        
        <TabsContent value="languages" className="space-y-4">
          <LanguagesForm
            languages={resumeData.languages}
            onChange={(languages) => setResumeData({ ...resumeData, languages })}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeEditor;