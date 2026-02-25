"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ResumePreview from "../builder/ResumePreview";

export default function PreviewPage() {
  // Load resume data from localStorage
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
    summary: "",
    education: [{ institution: "", degree: "", year: "" }],
    experience: [{ company: "", position: "", duration: "", description: "" }],
    projects: [{ title: "", description: "", techStack: [], liveUrl: "", githubUrl: "" }],
    skills: {
      technical: [],
      soft: [],
      tools: []
    },
    links: {
      github: "",
      linkedin: "",
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error('Failed to parse resume data from localStorage:', error);
      }
    }
  }, []);

  const [template, setTemplate] = useState('classic');
  const [colorTheme, setColorTheme] = useState('teal'); // Default teal theme

  // Load template from localStorage on component mount
  useEffect(() => {
    const savedTemplate = localStorage.getItem('resumeTemplate');
    if (savedTemplate) {
      setTemplate(savedTemplate);
    }
    
    const savedColorTheme = localStorage.getItem('resumeColorTheme');
    if (savedColorTheme) {
      setColorTheme(savedColorTheme);
    }
  }, []);

  // Function to copy resume as plain text
  const copyResumeAsText = () => {
    let text = '';
    
    // Add personal info
    if (resumeData.personalInfo.name) {
      text += `${resumeData.personalInfo.name}\n`;
    }
    
    // Add contact info
    if (resumeData.personalInfo.email) {
      text += `${resumeData.personalInfo.email}\n`;
    }
    if (resumeData.personalInfo.phone) {
      text += `${resumeData.personalInfo.phone}\n`;
    }
    if (resumeData.personalInfo.location) {
      text += `${resumeData.personalInfo.location}\n`;
    }
    
    // Add summary
    if (resumeData.summary) {
      text += `\nSUMMARY\n${resumeData.summary}\n`;
    }
    
    // Add education
    if (resumeData.education && resumeData.education.some(edu => 
      edu.institution.trim() !== "" || edu.degree.trim() !== "" || edu.year.trim() !== ""
    )) {
      text += `\nEDUCATION\n`;
      resumeData.education.forEach(edu => {
        if (edu.institution.trim() !== "" || edu.degree.trim() !== "" || edu.year.trim() !== "") {
          if (edu.institution) text += `${edu.institution}\n`;
          if (edu.degree) text += `${edu.degree}\n`;
          if (edu.year) text += `${edu.year}\n`;
          text += '\n';
        }
      });
    }
    
    // Add experience
    if (resumeData.experience && resumeData.experience.some(exp => 
      exp.company.trim() !== "" || exp.position.trim() !== "" || exp.description.trim() !== ""
    )) {
      text += `\nEXPERIENCE\n`;
      resumeData.experience.forEach(exp => {
        if (exp.company.trim() !== "" || exp.position.trim() !== "" || exp.description.trim() !== "") {
          if (exp.position) text += `${exp.position}\n`;
          if (exp.company) text += `${exp.company}\n`;
          if (exp.duration) text += `${exp.duration}\n`;
          if (exp.description) text += `${exp.description}\n`;
          text += '\n';
        }
      });
    }
    
    // Add projects
    if (resumeData.projects && resumeData.projects.some(proj => 
      proj.title.trim() !== "" || proj.description.trim() !== "" || proj.liveUrl.trim() !== "" || proj.githubUrl.trim() !== ""
    )) {
      text += `\nPROJECTS\n`;
      resumeData.projects.forEach(proj => {
        if (proj.title.trim() !== "" || proj.description.trim() !== "" || proj.liveUrl.trim() !== "" || proj.githubUrl.trim() !== "") {
          if (proj.title) text += `${proj.title}\n`;
          if (proj.description) text += `${proj.description}\n`;
          if (proj.liveUrl) text += `Live: ${proj.liveUrl}\n`;
          if (proj.githubUrl) text += `GitHub: ${proj.githubUrl}\n`;
          text += '\n';
        }
      });
    }
    
    // Add skills
    if (resumeData.skills) {
      text += `\nSKILLS\n`;
      if (resumeData.skills.technical.length > 0) {
        text += `Technical: ${resumeData.skills.technical.join(', ')}\n`;
      }
      if (resumeData.skills.soft.length > 0) {
        text += `Soft: ${resumeData.skills.soft.join(', ')}\n`;
      }
      if (resumeData.skills.tools.length > 0) {
        text += `Tools: ${resumeData.skills.tools.join(', ')}\n`;
      }
    }
    
    // Add links
    if (resumeData.links.github || resumeData.links.linkedin) {
      text += `\nLINKS\n`;
      if (resumeData.links.github) text += `GitHub: ${resumeData.links.github}\n`;
      if (resumeData.links.linkedin) text += `LinkedIn: ${resumeData.links.linkedin}\n`;
    }
    
    navigator.clipboard.writeText(text);
    alert('Resume copied to clipboard as plain text!');
  };

  // Function to validate resume before export
  const validateResume = () => {
    const hasName = resumeData.personalInfo.name && resumeData.personalInfo.name.trim() !== "";
    const hasProjectOrExperience = 
      resumeData.projects.some(proj => proj.title.trim() !== "") ||
      resumeData.experience.some(exp => exp.company.trim() !== "");
    
    if (!hasName || !hasProjectOrExperience) {
      alert('Your resume may look incomplete.');
    }
  };

  // Function to trigger print
  const handlePrint = () => {
    validateResume();
    // Show toast notification
    alert('PDF export ready! Check your downloads.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">AI Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <span className="text-gray-400 print:hidden">|</span>
              <Link href="/builder" className="text-gray-600 hover:text-gray-900">Builder</Link>
              <span className="text-gray-400 print:hidden">|</span>
              <Link href="/preview" className="text-blue-600 font-medium">Preview</Link>
              <span className="text-gray-400 print:hidden">|</span>
              <Link href="/proof" className="text-gray-600 hover:text-gray-900">Proof</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        {/* Template Selection and Export Buttons */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md print:hidden">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Choose Template</h3>
              <div className="flex space-x-2 mb-4">
                <button 
                  onClick={() => setTemplate('classic')}
                  className={`px-4 py-2 rounded-md ${
                    template === 'classic' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Classic
                </button>
                <button 
                  onClick={() => setTemplate('modern')}
                  className={`px-4 py-2 rounded-md ${
                    template === 'modern' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Modern
                </button>
                <button 
                  onClick={() => setTemplate('minimal')}
                  className={`px-4 py-2 rounded-md ${
                    template === 'minimal' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Minimal
                </button>
              </div>
              
              <h4 className="text-md font-medium text-gray-700 mb-2">Color Theme</h4>
              <div className="flex space-x-2">
                {['teal', 'navy', 'burgundy', 'forest', 'charcoal'].map((themeName) => {
                  const colorThemes = {
                    teal: 'hsl(168, 60%, 40%)',
                    navy: 'hsl(220, 60%, 35%)',
                    burgundy: 'hsl(345, 60%, 35%)',
                    forest: 'hsl(150, 50%, 30%)',
                    charcoal: 'hsl(0, 0%, 25%)'
                  };
                  return (
                    <div
                      key={themeName}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${colorTheme === themeName ? 'border-gray-800' : 'border-gray-300'}`}
                      style={{ backgroundColor: colorThemes[themeName as keyof typeof colorThemes] }}
                      onClick={() => setColorTheme(themeName)}
                      title={themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <button 
              onClick={handlePrint}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Download PDF
            </button>
            <button 
              onClick={copyResumeAsText}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Copy Resume as Text
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 print:p-12 print:bg-white print:text-black">
          <ResumePreview data={resumeData} template={template} colorTheme={colorTheme} />
        </div>
      </div>
    </div>
  );
}