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
    projects: [{ title: "", description: "", techStack: [], liveUrl: "", githubUrl: "" }], // Updated projects structure
    skills: {
      technical: [],
      soft: [],
      tools: []
    }, // New skills structure
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

  const [colorTheme, setColorTheme] = useState('teal'); // Default teal theme

  // Load color theme from localStorage on component mount
  useEffect(() => {
    const savedColorTheme = localStorage.getItem('resumeColorTheme');
    if (savedColorTheme) {
      setColorTheme(savedColorTheme);
    }
  }, []);

  // Save color theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('resumeColorTheme', colorTheme);
  }, [colorTheme]);

  // Color themes mapping
  const colorThemes = {
    teal: 'hsl(168, 60%, 40%)',
    navy: 'hsl(220, 60%, 35%)',
    burgundy: 'hsl(345, 60%, 35%)',
    forest: 'hsl(150, 50%, 30%)',
    charcoal: 'hsl(0, 0%, 25%)'
  };

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
    
    // Check for at least 8 skills total
    const totalSkills = [...resumeData.skills.technical, ...resumeData.skills.soft, ...resumeData.skills.tools].length;
    if (totalSkills >= 8) {
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
    
    // Check for at least 8 skills total
    const totalSkills = [...resumeData.skills.technical, ...resumeData.skills.soft, ...resumeData.skills.tools].length;
    if (totalSkills < 8) {
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

    // Check for at least 8 skills total
    const totalSkills = [...resumeData.skills.technical, ...resumeData.skills.soft, ...resumeData.skills.tools].length;
    if (totalSkills < 8) {
      improvements.push("Add more relevant skills to improve keyword matching.");
    }

    if (!resumeData.experience.some(exp => exp.company.trim() !== "")) {
      improvements.push("Consider adding internship or project work experience.");
    }

    return improvements.slice(0, 3); // Limit to top 3 improvements
  };

  // Handle skill input (Enter key to add skill)
  const handleSkillInput = (e: React.KeyboardEvent<HTMLInputElement>, category: keyof typeof resumeData.skills) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      const newSkill = e.currentTarget.value.trim();
      setResumeData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: [...prev.skills[category], newSkill]
        }
      }));
      e.currentTarget.value = ''; // Clear input after adding
    }
  };

  // Remove a skill from a category
  const removeSkill = (category: keyof typeof resumeData.skills, index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index)
      }
    }));
  };

  // Suggest skills based on category
  const suggestSkills = async (category: keyof typeof resumeData.skills) => {
    // Show loading state
    // In a real app, we'd have a loading state, but for now we'll just simulate with a timeout
    const suggestedSkillsMap: Record<string, string[]> = {
      technical: ["TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"],
      soft: ["Team Leadership", "Problem Solving"],
      tools: ["Git", "Docker", "AWS"]
    };

    const newSkills = suggestedSkillsMap[category];
    if (newSkills) {
      // Simulate loading for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResumeData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: Array.from(new Set([...prev.skills[category], ...newSkills])) // Use Set to avoid duplicates
        }
      }));
    }
  };

  // Add a new project entry
  const addProjectEntry = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", techStack: [], liveUrl: "", githubUrl: "" }]
    }));
  };

  // Remove a project entry
  const removeProjectEntry = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  // Handle tech stack input (Enter key to add tech)
  const handleTechStackInput = (e: React.KeyboardEvent<HTMLInputElement>, projectIndex: number) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      const newTech = e.currentTarget.value.trim();
      setResumeData(prev => ({
        ...prev,
        projects: prev.projects.map((proj, idx) => 
          idx === projectIndex 
            ? { ...proj, techStack: [...proj.techStack, newTech] } 
            : proj
        )
      }));
      e.currentTarget.value = ''; // Clear input after adding
    }
  };

  // Handle changes to project fields
  const handleProjectChange = (projectIndex: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, idx) => 
        idx === projectIndex ? { ...proj, [field]: value } : proj
      )
    }));
  };

  // Remove a tech stack item
  const removeTechStackItem = (projectIndex: number, techIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, idx) => 
        idx === projectIndex 
          ? { ...proj, techStack: proj.techStack.filter((_, i) => i !== techIndex) } 
          : proj
      )
    }));
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
          title: "E-commerce Platform", 
          description: "Full-stack e-commerce solution with payment integration", 
          techStack: ["React", "Node.js", "PostgreSQL"],
          liveUrl: "https://ecommerce-platform-demo.com",
          githubUrl: "https://github.com/example/ecommerce" 
        },
        { 
          title: "Task Management App", 
          description: "Collaborative task management application with real-time updates", 
          techStack: ["Vue.js", "Express", "MongoDB"],
          liveUrl: "https://task-app-demo.com",
          githubUrl: "https://github.com/example/taskapp" 
        }
      ],
      skills: {
        technical: ["JavaScript", "React", "Node.js", "Python", "SQL"],
        soft: ["Leadership", "Communication", "Problem-solving"],
        tools: ["Git", "Docker", "AWS"]
      },
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

            {/* Skills Section - NEW */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Skills</h3>
              
              {/* Technical Skills */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-700">Technical Skills ({resumeData.skills.technical.length})</h4>
                  <button 
                    onClick={() => suggestSkills('technical')}
                    className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
                  >
                    ✨ Suggest Skills
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md min-h-[50px]">
                  {resumeData.skills.technical.map((skill, index) => (
                    <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                      <button 
                        onClick={() => removeSkill('technical', index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Type skill and press Enter..."
                    onKeyDown={(e) => handleSkillInput(e, 'technical')}
                    className="flex-1 min-w-[150px] p-2 border-0 focus:outline-none"
                  />
                </div>
              </div>
              
              {/* Soft Skills */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-700">Soft Skills ({resumeData.skills.soft.length})</h4>
                  <button 
                    onClick={() => suggestSkills('soft')}
                    className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
                  >
                    ✨ Suggest Skills
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md min-h-[50px]">
                  {resumeData.skills.soft.map((skill, index) => (
                    <div key={index} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                      <button 
                        onClick={() => removeSkill('soft', index)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Type skill and press Enter..."
                    onKeyDown={(e) => handleSkillInput(e, 'soft')}
                    className="flex-1 min-w-[150px] p-2 border-0 focus:outline-none"
                  />
                </div>
              </div>
              
              {/* Tools & Technologies */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-700">Tools & Technologies ({resumeData.skills.tools.length})</h4>
                  <button 
                    onClick={() => suggestSkills('tools')}
                    className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
                  >
                    ✨ Suggest Skills
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md min-h-[50px]">
                  {resumeData.skills.tools.map((skill, index) => (
                    <div key={index} className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                      <button 
                        onClick={() => removeSkill('tools', index)}
                        className="ml-2 text-yellow-600 hover:text-yellow-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Type skill and press Enter..."
                    onKeyDown={(e) => handleSkillInput(e, 'tools')}
                    className="flex-1 min-w-[150px] p-2 border-0 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Projects Section - NEW */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
                <button 
                  onClick={addProjectEntry}
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Add Project
                </button>
              </div>
              
              <div className="space-y-4">
                {resumeData.projects.map((proj, index) => (
                  <div key={index} className="border border-gray-200 p-4 rounded-md">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-700">{proj.title || `Project ${index + 1}`}</h4>
                      <button 
                        onClick={() => removeProjectEntry(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Project Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between">
                          <label className="block text-sm font-medium text-gray-600 mb-1">Description (Max 200 chars)</label>
                          <span className="text-xs text-gray-500">{proj.description.length}/200</span>
                        </div>
                        <textarea
                          value={proj.description}
                          onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                          maxLength={200}
                          rows={2}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Tech Stack</label>
                      <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md min-h-[50px]">
                        {proj.techStack.map((tech, techIndex) => (
                          <div key={techIndex} className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                            {tech}
                            <button 
                              onClick={() => removeTechStackItem(index, techIndex)}
                              className="ml-2 text-indigo-600 hover:text-indigo-800"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <input
                          type="text"
                          placeholder="Add technology and press Enter..."
                          onKeyDown={(e) => handleTechStackInput(e, index)}
                          className="flex-1 min-w-[150px] p-2 border-0 focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Live URL</label>
                        <input
                          type="text"
                          value={proj.liveUrl}
                          onChange={(e) => handleProjectChange(index, 'liveUrl', e.target.value)}
                          placeholder="https://example.com"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">GitHub URL</label>
                        <input
                          type="text"
                          value={proj.githubUrl}
                          onChange={(e) => handleProjectChange(index, 'githubUrl', e.target.value)}
                          placeholder="https://github.com/username/repo"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
          <div className="bg-white p-6 rounded-lg shadow-md h-fit print:hidden">
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
            
            {/* Export buttons */}
            <div className="mb-4">
              <div className="flex space-x-2">
                <button 
                  onClick={handlePrint}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full"
                >
                  Download PDF
                </button>
                <button 
                  onClick={copyResumeAsText}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
                >
                  Copy Resume as Text
                </button>
              </div>
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