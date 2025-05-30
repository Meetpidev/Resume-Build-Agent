import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, Award, Settings } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Create a professional resume in minutes
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Our AI-powered resume builder helps you craft the perfect resume 
              tailored to your career goals and stand out to employers.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make it easy to create a standout resume that will get you noticed by employers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 transition-transform hover:scale-105">
              <div className="bg-blue-900 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Settings className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Easy to Use</h3>
              <p className="text-gray-600">
                Our intuitive interface guides you through each section of your resume with helpful tips and suggestions.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 transition-transform hover:scale-105">
              <div className="bg-blue-900 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Professional Templates</h3>
              <p className="text-gray-600">
                Choose from a variety of professionally designed templates that are optimized for ATS systems.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 transition-transform hover:scale-105">
              <div className="bg-blue-900 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Smart Suggestions</h3>
              <p className="text-gray-600">
                Get intelligent suggestions for skills and achievements based on your job title and industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create your professional resume in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-teal-500 text-white flex items-center justify-center text-2xl font-bold mb-6">
                  1
                </div>
                <div className="hidden md:block absolute top-8 -right-full w-full h-0.5 bg-teal-500"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Choose a Template</h3>
              <p className="text-gray-600">
                Select from our library of professional resume templates designed to impress employers.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-teal-500 text-white flex items-center justify-center text-2xl font-bold mb-6">
                  2
                </div>
                <div className="hidden md:block absolute top-8 -right-full w-full h-0.5 bg-teal-500"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Add Your Information</h3>
              <p className="text-gray-600">
                Fill in your details with our guided forms and get suggestions to improve your content.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div>
                <div className="w-16 h-16 rounded-full bg-teal-500 text-white flex items-center justify-center text-2xl font-bold mb-6">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Download & Share</h3>
              <p className="text-gray-600">
                Download your polished resume in multiple formats or share it directly with employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thousands of job seekers have found success with our resume builder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-8 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jane Doe</h4>
                    <p className="text-gray-600 text-sm">Software Engineer</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "This resume builder helped me land my dream job! The templates are professional and the suggestions really improved my resume."
                </p>
                <div className="flex mt-4 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Professional Resume?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start building your resume now and get hired faster with our easy-to-use resume builder.
          </p>
          <Link
            to="/builder"
            className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-teal-500 text-white font-medium hover:bg-teal-400 transition-colors text-lg"
          >
            Build Your Resume <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;