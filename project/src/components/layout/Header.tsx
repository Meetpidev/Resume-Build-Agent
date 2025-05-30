import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { state, togglePreview } = useResume();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isBuilderActive = location.pathname.includes('/builder');
  const isTemplatesActive = location.pathname === '/templates';
  const isPreviewActive = location.pathname === '/preview';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-blue-900" />
          <span className="text-xl font-bold text-blue-900">ResumeBuilder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/builder"
            className={`font-medium transition-colors ${
              isBuilderActive ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
            }`}
          >
            Build Resume
          </Link>
          <Link
            to="/templates"
            className={`font-medium transition-colors ${
              isTemplatesActive ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
            }`}
          >
            Templates
          </Link>
          {isBuilderActive && (
            <button
              onClick={togglePreview}
              className={`font-medium transition-colors ${
                state.isPreviewMode ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
              }`}
            >
              {state.isPreviewMode ? 'Edit' : 'Preview'}
            </button>
          )}
          <Link
            to="/preview"
            className="px-4 py-2 rounded-md bg-blue-900 text-white font-medium hover:bg-blue-800 transition-colors"
          >
            Export
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/builder"
              className={`font-medium transition-colors ${
                isBuilderActive ? 'text-teal-600' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Build Resume
            </Link>
            <Link
              to="/templates"
              className={`font-medium transition-colors ${
                isTemplatesActive ? 'text-teal-600' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            {isBuilderActive && (
              <button
                onClick={() => {
                  togglePreview();
                  setIsMenuOpen(false);
                }}
                className={`font-medium transition-colors text-left ${
                  state.isPreviewMode ? 'text-teal-600' : 'text-gray-700'
                }`}
              >
                {state.isPreviewMode ? 'Edit' : 'Preview'}
              </button>
            )}
            <Link
              to="/preview"
              className="px-4 py-2 rounded-md bg-blue-900 text-white font-medium hover:bg-blue-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Export
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;