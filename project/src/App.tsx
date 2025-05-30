import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './contexts/ResumeContext';
import { ToastContainer } from './components/ui/Toast';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import TemplatesPage from './pages/TemplatesPage';
import PreviewPage from './pages/PreviewPage';
import { useEffect } from 'react';

function App() {
   useEffect(() => {
    const scriptId = 'google-translate-script';
   

    const initGoogleTranslate = () => {
      window.gtranslateSettings = {
        default_language: 'en',
        detect_browser_language: true,
        wrapper_selector: '.gtranslate_wrapper',
      };
      
      
    };

    if (!document.querySelector(`#${scriptId}`)) {
      const script = document.createElement('script');
      script.src = 'https://cdn.gtranslate.net/widgets/latest/float.js';
      script.defer = true;
      script.id = scriptId;
      document.body.appendChild(script);
      script.onload = initGoogleTranslate;
    } else {
      initGoogleTranslate();
    }

  return () => {
    // Remove Google Translate script
    const script = document.querySelector(`#${scriptId}`);
    if (script) {
      document.body.removeChild(script);
    }
  };
}, []);
  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder/*" element={<BuilderPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/preview" element={<PreviewPage />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </div>
      <div className="gtranslate_wrapper"></div>
    </ResumeProvider>
  );
}

export default App;