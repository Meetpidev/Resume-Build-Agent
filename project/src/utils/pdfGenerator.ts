import React from 'react'; // Required for React.createElement
import { ResumeData } from '../types/resume';
import { Template } from '../types/templates';
import { pdf } from '@react-pdf/renderer';

export const generatePDF = async (resumeData: ResumeData, Template: React.FC<{ data: ResumeData }>) => {
 const blob = await pdf(React.createElement(Template, { data: resumeData })).toBlob();

  return blob;
};

