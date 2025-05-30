import React from 'react';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-6 w-6" />
              <span className="text-lg font-bold">ResumeBuilder</span>
            </div>
            <p className="text-gray-400 text-sm">
              Create professional resumes with our easy-to-use builder. Stand out
              from the crowd and get hired faster.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/builder" className="hover:text-teal-400 transition-colors">Resume Builder</a></li>
              <li><a href="/templates" className="hover:text-teal-400 transition-colors">Resume Templates</a></li>
              <li><a href="/preview" className="hover:text-teal-400 transition-colors">Resume Preview</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Resume Examples</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Resume Writing Tips</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Career Advice</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Job Search Guide</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Interview Preparation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Stay updated with our latest features and resume tips.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;