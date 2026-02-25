"use client";

import { useState, useEffect } from "react";
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

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved data:', e);
      }
    }
  }, []);

  // Autosave to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
  }, [resumeData]);

  const [template, setTemplate] = useState('classic');

  // Load template from localStorage on component mount
  useEffect(() => {
    const savedTemplate = localStorage.getItem('resumeTemplate');
    if (savedTemplate) {
      setTemplate(savedTemplate);
    }
  }, []);

  // Save template to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('resumeTemplate', template);
  }, [template]);

  // Calculate ATS Score
  const calculateATSScore = (): number => {
    let score = 0;
    
    // Check summary length (40-120 words)
    const summaryWords = resumeData.summary.trim().split(/\s+/).filter(word => word.length > 0);
    if (summaryWords.length >= 40 && summaryWords.length <= 120) {
      score += 15;
    }
    
    // Check for at least 2 projects
    if (resumeData.projects.length >= 2) {
      score += 10;
    }
    
    // Check for at least 1 experience entry
    if (resumeData.experience.some(exp => exp.company.trim() !== "")) {
      score += 10;
    }
    
    // Check for at least 8 skills
    const skillsList = resumeData.skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
    if (skillsList.length >= 8) {
      score += 10;
    }
    
    // Check for GitHub or LinkedIn link
    if (resumeData.links.github.trim() !== "" || resumeData.links.linkedin.trim() !== "") {
      score += 10;
    }
    
    // Check experience/project bullets for numbers (% X k etc.)
    const hasNumbersInBullets = [
      ...resumeData.experience.map(exp => exp.description),
      ...resumeData.projects.map(proj => proj.description)
    ].some(text => /[%0-9kmb]/i.test(text));
    
    if (hasNumbersInBullets) {
      score += 15;
    }
    
    // Check for complete education fields
    const hasCompleteEducation = resumeData.education.some(edu => 
      edu.institution.trim() !== "" && edu.degree.trim() !== "" && edu.year.trim() !== ""
    );
    if (hasCompleteEducation) {
      score += 10;
    }
    
    return Math.min(score, 100); // Cap at 100
  };

  // Generate suggestions
  const getSuggestions = (): string[] => {
    const suggestions: string[] = [];
    
    const summaryWords = resumeData.summary.trim().split(/\s+/).filter(word => word.length > 0);
    if (summaryWords.length < 40 || summaryWords.length > 120) {
      suggestions.push("Write a stronger summary (40–120 words)." );
    }
    
    if (resumeData.projects.length < 2) {
      suggestions.push("Add at least 2 projects." );
    }
    
    if (!resumeData.experience.some(exp => exp.company.trim() !== "")) {
      suggestions.push("Add at least 1 experience entry." );
    }
    
    const skillsList = resumeData.skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
    if (skillsList.length < 8) {
      suggestions.push("Add more skills (target 8+)." );
    }
    
    const hasNumbersInBullets = [
      ...resumeData.experience.map(exp => exp.description),
      ...resumeData.projects.map(proj => proj.description)
    ].some(text => /[%0-9kmb]/i.test(text));
    
    if (!hasNumbersInBullets) {
      suggestions.push("Add measurable impact (numbers) in bullets." );
    }
    
    if (suggestions.length > 3) {
      return suggestions.slice(0, 3); // Limit to 3 suggestions
    }
    
    return suggestions;
  };

  // Get improvement suggestions
  const getImprovementSuggestions = (): string[] => {
    const improvements: string[] = [];

    if (resumeData.projects.length < 2) {
      improvements.push("Add more projects to strengthen your portfolio.");
    }

    const hasNumbersInBullets = [
      ...resumeData.experience.map(exp => exp.description),
      ...resumeData.projects.map(proj => proj.description)
    ].some(text => /[%0-9kmb]/i.test(text));

    if (!hasNumbersInBullets) {
      improvements.push("Include metrics and numbers to demonstrate impact.");
    }

    const summaryWords = resumeData.summary.trim().split(/\s+/).filter(word => word.length > 0);
    if (summaryWords.length < 40) {
      improvements.push("Expand your summary to better showcase your experience.");
    }

    const skillsList = resumeData.skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
    if (skillsList.length < 8) {
      improvements.push("Add more relevant skills to improve keyword matching.");
    }

    if (!resumeData.experience.some(exp => exp.company.trim() !== "")) {
      improvements.push("Consider adding internship or project work experience.");
    }

    return improvements.slice(0, 3); // Limit to top 3 improvements
  };

  // Check if bullet starts with action verb
  const startsWithActionVerb = (text: string): boolean => {
    const actionVerbs = ['Built', 'Developed', 'Designed', 'Implemented', 'Led', 'Improved', 'Created', 'Optimized', 'Automated'];
    const trimmedText = text.trim();
    return actionVerbs.some(verb => trimmedText.startsWith(verb));
  };

  // Check if bullet has numeric indicators
  const hasNumericIndicator = (text: string): boolean => {
    return /[%0-9kmb]/i.test(text);
  };

  const atsScore = calculateATSScore();
  const suggestions = getSuggestions();
  const improvementSuggestions = getImprovementSuggestions();

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
            
            {/* Template Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Choose Template</h3>
              <div className="flex space-x-2">
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
            </div>
            
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
                      {/* Bullet guidance */}
                      {exp.description.trim() && (
                        <div className="mt-2 text-xs">
                          {!startsWithActionVerb(exp.description) && (
                            <div className="text-orange-600">• Start with a strong action verb.</div>
                          )}
                          {!hasNumericIndicator(exp.description) && (
                            <div className="text-orange-600">• Add measurable impact (numbers).</div>
                          )}
                        </div>
                      )}
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
                      {/* Bullet guidance */}
                      {proj.description.trim() && (
                        <div className="mt-2 text-xs">
                          {!startsWithActionVerb(proj.description) && (
                            <div className="text-orange-600">• Start with a strong action verb.</div>
                          )}
                          {!hasNumericIndicator(proj.description) && (
                            <div className="text-orange-600">• Add measurable impact (numbers).</div>
                          )}
                        </div>
                      )}
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
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">ATS Readiness Score</span>
                <span className="text-sm font-bold text-gray-900">{atsScore}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    atsScore < 30 ? 'bg-red-500' : 
                    atsScore < 60 ? 'bg-orange-400' : 
                    atsScore < 80 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`} 
                  style={{ width: `${atsScore}%` }}
                ></div>
              </div>
              
              {suggestions.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Suggestions:</h4>
                  <ul className="space-y-1">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2">•</span> {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {improvementSuggestions.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Top 3 Improvements:</h4>
                  <ul className="space-y-1">
                    {improvementSuggestions.map((improvement, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">•</span> {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="border border-gray-200 rounded-md p-4 min-h-[400px]">
              <ResumePreview data={resumeData} template={template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}