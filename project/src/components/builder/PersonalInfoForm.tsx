import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import { useToast } from '../ui/Toast';
import { Personal } from '../../types/resume';
import { Info } from 'lucide-react';
import { AIChatSession } from '../../services/AImodels';
import { useState } from 'react';


const PersonalInfoForm: React.FC = () => {
  const { state, updateSection, nextStep } = useResume();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [formData, setFormData] = React.useState<Personal>(state.data.personal);
const prompt=`Job Title: ${formData.title} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format`
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email) {
      showToast('Please fill in required fields', 'error');
      return;
    }
    
    updateSection('personal', formData);
    nextStep();
    navigate('/builder/experience');
  };

  //  const GenerateSummeryFromAI=async()=>{
  //       const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
  //       console.log(PROMPT);
  //       const result=await AIChatSession.sendMessage(PROMPT);
  //       console.log(JSON.parse(result.response.text()))
       
  //       setAiGenerateSummeryList(JSON.parse(result.response.text()))
  //       setLoading(false);
  //   }

const GenerateSummaryFromAI = async () => {
  try {
    const prompt = `Write a professional resume summary for a ${formData.title}. It should be plain text (not JSON), 3-5 sentences long, highlighting skills, experience, and achievements and all this things is bullet point.`;

    const result = await AIChatSession.sendMessage(prompt);
    const responseText = await result.response.text();

    // Try parsing JSON in case AI still returns JSON
    let summary = "";

    try {
      const parsed = JSON.parse(responseText);
      if (typeof parsed.resume_summary === "string") {
        summary = parsed.resume_summary;
      } else {
        throw new Error("resume_summary not found");
      }
    } catch {
      // Fallback: treat response as plain text
      summary = responseText;
    }

    if (summary.trim()) {
      setFormData(prev => ({ ...prev, summary: summary.trim() }));
      showToast("Summary generated successfully!", "success");
    } else {
      showToast("AI did not return a usable summary.", "error");
    }

  } catch (error) {
    console.error("Error generating summary:", error);
    showToast("Failed to generate summary from AI.", "error");
  }
};

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Personal Information</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              This information will appear at the top of your resume. Only your name and job title are required, but including contact information makes it easier for employers to reach you.
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. John Smith"
              required
            />
          </div>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Software Engineer"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. john@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. (123) 456-7890"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. San Francisco, CA"
            />
          </div>
          
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
              Website/LinkedIn
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. linkedin.com/in/johnsmith"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
            Professional Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            rows={4}
            value={formData.summary}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a short summary of your professional background and key strengths (recommended: 3-5 sentences)"
          ></textarea>
              <button
  type="button"
  onClick={GenerateSummaryFromAI}
  className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:from-purple-600 hover:to-blue-600 focus:outline-none"
>
  ✨ Generate Summary with AI
</button>
          <p className="mt-1 text-sm text-gray-500">
            Tip: Focus on your most relevant skills and experience. Mention your years of experience, key achievements, and specializations.
          </p>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next: Experience
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;