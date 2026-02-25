"use client";

import Link from "next/link";

export default function ProofPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">AI Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <span className="text-gray-400">|</span>
              <Link href="/builder" className="text-gray-600 hover:text-gray-900">Builder</Link>
              <span className="text-gray-400">|</span>
              <Link href="/preview" className="text-gray-600 hover:text-gray-900">Preview</Link>
              <span className="text-gray-400">|</span>
              <Link href="/proof" className="text-blue-600 font-medium">Proof</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Resume Proof</h1>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Resume Artifacts</h2>
              <p className="text-gray-600">Your resume has been successfully built. All sections are complete and formatted according to ATS standards.</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Export Options</h2>
              <p className="text-gray-600">Coming soon: PDF export functionality to download your resume in professional formats.</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">ATS Scoring</h2>
              <p className="text-gray-600">Coming soon: Advanced ATS compatibility analysis to optimize your resume for applicant tracking systems.</p>
            </div>
            
            <div className="pt-6">
              <Link 
                href="/builder" 
                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Continue Editing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}