import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';
import ResumePreview from '../components/preview/ResumePreview';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PreviewPage: React.FC = () => {
  const { state } = useResume();
  const navigate = useNavigate();
  const previewRef = React.useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${state.data.personal.name || 'resume'}.pdf`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Resume Preview</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/builder')}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Edit Resume
          </button>
          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div ref={previewRef}>
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;