import React from 'react';
import TextareaField from '../../ui/TextareaField';
import { AIChatSession } from './../../../services/AImodels';
import { useToast } from '../../ui/Toast';

  
interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ summary, onChange }) => {

  const { showToast } = useToast();
  
const handleEnhance = async () => {
  if (!summary.trim()) {
    showToast('Please enter a summary first.', 'error');
    return;
  }

  try {
    const prompt = `
Enhance the following professional summary for a resume. Rewrite it in 2-3 bullet points.
Respond only in JSON like: {"enhancedDescription": ["Point 1", "Point 2", "Point 3"]}

Summary:
"${summary}"
    `;

    const result = await AIChatSession.sendMessage(prompt);
    console.log('🔍 AI full response:', result);

    const rawText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('📦 AI raw text:', rawText);

    let enhanced = '';
    try {
      const parsed = JSON.parse(rawText);

      if (Array.isArray(parsed.enhancedDescription)) {
        const descriptions = parsed.enhancedDescription
          .filter(Boolean)
          .map((item) =>
            typeof item === 'string' ? item.trim() : JSON.stringify(item)
          );
        enhanced = descriptions.map((line) => `• ${line}`).join('\n');
      } else if (typeof parsed.enhancedDescription === 'string') {
        enhanced = parsed.enhancedDescription.trim();
      } else {
        throw new Error('Unexpected format in enhancedDescription');
      }

    } catch (err) {
      console.error('JSON parse error:', err);
      showToast('Failed to parse AI response.', 'error');
      return;
    }

    if (!enhanced) {
      showToast('AI response was empty.', 'error');
      return;
    }

    onChange(enhanced);
    showToast('Summary enhanced successfully.', 'success');
  } catch (error) {
    console.error('Enhance error:', error);
    showToast('Failed to enhance summary. Please try again.', 'error');
  }
};

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Professional Summary</h3>
      <p className="text-sm text-gray-600">
        Write a concise overview of your professional background, skills, and career goals.
      </p>
      
      <TextareaField
        label="Summary"
        id="summary"
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
      />
        <button
        type="button"
        onClick={handleEnhance}
        className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:from-purple-600 hover:to-blue-600 focus:outline-none"
      >
        Enhance with AI
      </button>
    </div>
  );
};

export default SummaryForm;