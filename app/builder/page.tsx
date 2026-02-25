"use client";

import { useState } from "react";
import Link from "next/link";
import ResumePreview from "./ResumePreview";

export default function BuilderPage() {
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
    projects: [{ name: "", description: "", link: "" }],
    skills: "",
    links: {
      github: "",
      linkedin: "",
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const handleProjectsChange = (index: number, field: string, value: string) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setResumeData(prev => ({ ...prev, projects: newProjects }));
  };

  const addEducationEntry = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { institution: "", degree: "", year: "" }]
    }));
  };

  const addExperienceEntry = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", position: "", duration: "", description: "" }]
    }));
  };

  const addProjectEntry = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: "", description: "", link: "" }]
    }));
  };

  const loadSampleData = () => {
    setResumeData({
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
    });
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
              <Link href="/builder" className="text-blue-600 font-medium">Builder</Link>
              <span className="text-gray-400">|</span>
              <Link href="/preview" className="text-gray-600 hover:text-gray-900">Preview</Link>
              <span className="text-gray-400">|</span>
              <Link href="/proof" className="text-gray-600 hover:text-gray-900">Proof</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form Sections */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Resume Builder</h2>
            
            <button 
              onClick={loadSampleData}
              className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Load Sample Data
            </button>

            {/* Personal Info Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Info</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Summary</h3>
              <textarea
                value={resumeData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Write a brief summary about yourself..."
              />
            </div>

            {/* Education Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Education</h3>
                <button 
                  onClick={addEducationEntry}
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Add Entry
                </button>
              </div>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="border border-gray-200 p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Institution</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Year</label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Experience</h3>
                <button 
                  onClick={addExperienceEntry}
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Add Entry
                </button>
              </div>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="border border-gray-200 p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Position</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Duration</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
                <button 
                  onClick={addProjectEntry}
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Add Entry
                </button>
              </div>
              <div className="space-y-4">
                {resumeData.projects.map((proj, index) => (
                  <div key={index} className="border border-gray-200 p-4 rounded-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Project Name</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => handleProjectsChange(index, 'name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => handleProjectsChange(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Link</label>
                      <input
                        type="text"
                        value={proj.link}
                        onChange={(e) => handleProjectsChange(index, 'link', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Skills</h3>
              <input
                type="text"
                value={resumeData.skills}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter skills separated by commas (e.g. JavaScript, React, Node.js)"
              />
            </div>

            {/* Links Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Links</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">GitHub</label>
                  <input
                    type="text"
                    value={resumeData.links.github}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      links: { ...prev.links, github: e.target.value }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">LinkedIn</label>
                  <input
                    type="text"
                    value={resumeData.links.linkedin}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      links: { ...prev.links, linkedin: e.target.value }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Live Preview Panel */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Live Preview</h3>
            <div className="border border-gray-200 rounded-md p-4 min-h-[600px]">
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}