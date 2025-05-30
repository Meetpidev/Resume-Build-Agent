import React from 'react';
import { ResumeData } from '../../types/resume';
import { Template } from '../../types/templates';
import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import { useState } from 'react';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Template render error:", error);
  }

  render() {
    return this.state.hasError 
      ? <div className="text-red-500 p-4">Error rendering template</div>
      : this.props.children;
  }
}

interface ResumePreviewProps {
  template: Template | null;
  resumeData: ResumeData;
}



const ResumePreview: React.FC<ResumePreviewProps> = ({ template, resumeData }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!template) {
    return <div className="text-center py-12">Please select a template first</div>;
  }

  const handleDownload = async () => {
    console.log("download");
    
    if (!previewRef.current) return;
    setIsGenerating(true);
    try {
          previewRef.current.style.width = `${previewRef.current.scrollWidth}px`;
      previewRef.current.style.height = `${previewRef.current.scrollHeight}px`;
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: previewRef.current.scrollWidth,
        windowHeight: previewRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${resumeData?.personal?.name || 'resume'}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
};

  const renderTemplate = () => {
    switch (template.type) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} template={template} />;
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} template={template} />;
      case 'minimal':
        return <MinimalTemplate resumeData={resumeData} template={template} />;
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} template={template} />;
      default:
        return <div>Template not found</div>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            isGenerating ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          <Download size={16} className="mr-2" />
          {isGenerating ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>
      
      <div className="border border-gray-200 rounded overflow-hidden shadow-sm">
        <div className="bg-gray-50 py-2 px-4 flex items-center justify-between border-b border-gray-200">
          <span className="text-sm text-gray-600">{template.name}</span>
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: template.colors.primary }}
            ></span>
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: template.colors.secondary }}
            ></span>
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: template.colors.accent }}
            ></span>
          </div>
        </div>
        <div
  id="resume-preview"
  ref={previewRef}
  className="overflow-auto max-h-[calc(100vh-240px)] bg-white p-4"
>
  {renderTemplate()}
</div>
      </div>
    </div>
  );
};

export default ResumePreview;