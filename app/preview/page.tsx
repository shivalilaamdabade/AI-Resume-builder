"use client";

import { useState } from "react";
import Link from "next/link";
import ResumePreview from "../builder/ResumePreview";

export default function PreviewPage() {
  // Sample resume data for preview
  const sampleResumeData = {
    personalInfo: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
    },
    summary: "Passionate software engineer with 5 years of experience developing scalable web applications using modern JavaScript frameworks.",
    education: [
      { institution: "Stanford University", degree: "BS Computer Science", year: "2015-2019" },
      { institution: "City College", degree: "Associate Degree", year: "2013-2015" }
    ],
    experience: [
      { 
        company: "Tech Innovations Inc.", 
        position: "Senior Software Engineer", 
        duration: "Jan 2021 - Present", 
        description: "Lead development of customer-facing applications using React and Node.js." 
      },
      { 
        company: "Digital Solutions LLC", 
        position: "Software Developer",
        duration: "Jun 2019 - Dec 2020", 
        description: "Built and maintained web applications using JavaScript, React, and Python." 
      }
    ],
    projects: [
      { 
        name: "E-commerce Platform", 
        description: "Full-stack e-commerce solution with payment integration", 
        link: "https://github.com/example/ecommerce" 
      },
      { 
        name: "Task Management App", 
        description: "Collaborative task management application with real-time updates", 
        link: "https://github.com/example/taskapp" 
      }
    ],
    skills: "JavaScript, React, Node.js, Python, SQL, AWS, Docker",
    links: {
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson"
    },
  };

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
              <Link href="/preview" className="text-blue-600 font-medium">Preview</Link>
              <span className="text-gray-400">|</span>
              <Link href="/proof" className="text-gray-600 hover:text-gray-900">Proof</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 print:p-12">
          <ResumePreview data={sampleResumeData} />
        </div>
      </div>
    </div>
  );
}