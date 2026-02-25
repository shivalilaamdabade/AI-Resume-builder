interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface EducationEntry {
  institution: string;
  degree: string;
  year: string;
}

interface ExperienceEntry {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface ProjectEntry {
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

interface Links {
  github: string;
  linkedin: string;
}

interface Skills {
  technical: string[];
  soft: string[];
  tools: string[];
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: Skills;
  links: Links;
}

interface ResumePreviewProps {
  data: ResumeData;
  template?: string;
  colorTheme?: string;
}

export default function ResumePreview({ data, template = 'classic', colorTheme = 'teal' }: ResumePreviewProps) {
  // Filter out empty sections
  const hasSummary = data.summary && data.summary.trim() !== "";
  const hasEducation = data.education && data.education.some((edu: EducationEntry) => 
    edu.institution.trim() !== "" || edu.degree.trim() !== "" || edu.year.trim() !== ""
  );
  const hasExperience = data.experience && data.experience.some((exp: ExperienceEntry) => 
    exp.company.trim() !== "" || exp.position.trim() !== "" || exp.description.trim() !== ""
  );
  const hasProjects = data.projects && data.projects.some((proj: ProjectEntry) => 
    proj.title.trim() !== "" || proj.description.trim() !== "" || proj.liveUrl.trim() !== "" || proj.githubUrl.trim() !== ""
  );
  const hasSkills = data.skills && (
    data.skills.technical.length > 0 || 
    data.skills.soft.length > 0 || 
    data.skills.tools.length > 0
  );
  const hasLinks = (data.links.github && data.links.github.trim() !== "") || 
                  (data.links.linkedin && data.links.linkedin.trim() !== "");

  // Define class based on template
  const getTemplateClass = (baseClass: string) => {
    if (template === 'modern') {
      return baseClass + ' font-sans';
    } else if (template === 'minimal') {
      return baseClass + ' font-sans'; // Changed to sans-serif for minimal
    } else { // classic
      return baseClass + ' font-serif'; // Changed to serif for classic
    }
  };

  // Color themes mapping
  const colorThemes = {
    teal: 'hsl(168, 60%, 40%)',
    navy: 'hsl(220, 60%, 35%)',
    burgundy: 'hsl(345, 60%, 35%)',
    forest: 'hsl(150, 50%, 30%)',
    charcoal: 'hsl(0, 0%, 25%)'
  };

  const accentColor = colorThemes[colorTheme as keyof typeof colorThemes] || colorThemes.teal;

  return (
    <div className={`${getTemplateClass("text-sm")} print:bg-white print:text-black print:border-0`} style={template === 'modern' ? { backgroundColor: accentColor, borderRadius: '0.5rem' } : {}}>
      {/* For Modern template, show sidebar layout */}
      {template === 'modern' ? (
        <div className="flex" style={{ minHeight: '297mm' }}>
          {/* Sidebar */}
          <div className="w-1/3 bg-white p-6" style={{ backgroundColor: accentColor }}>
            {/* Header */}
            <div className="mb-6">
              <h1 className={`${getTemplateClass("text-xl font-bold text-center print:text-xl")} print:uppercase print:tracking-wide`}>
                {data.personalInfo.name || "Your Name"}
              </h1>
              <div className="flex justify-center space-x-6 mt-2 text-gray-600">
                {data.personalInfo.email && <span className="print:text-black">{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span className="print:text-black">{data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span className="print:text-black">{data.personalInfo.location}</span>}
              </div>
              {(data.links.github || data.links.linkedin) && (
                <div className="flex justify-center mt-2 space-x-4 text-gray-600">
                  {data.links.github && <span className="print:text-black">GitHub: {data.links.github}</span>}
                  {data.links.linkedin && <span className="print:text-black">LinkedIn: {data.links.linkedin}</span>}
                </div>
              )}
            </div>

            {/* Skills in sidebar */}
            {hasSkills && (
              <div className="mb-6">
                <h2 className={`${getTemplateClass("text-base font-semibold pb-1 mb-2")} ${(template === 'minimal') ? 'uppercase tracking-wider text-xs' : ''}`} style={{ borderBottom: `2px solid ${accentColor}` }}>
                  SKILLS
                </h2>
                <div className="space-y-2">
                  {data.skills.technical.length > 0 && (
                    <div>
                      <div className="font-medium text-sm">Technical:</div>
                      <div className="text-sm">{data.skills.technical.join(", ")}</div>
                    </div>
                  )}
                  {data.skills.soft.length > 0 && (
                    <div>
                      <div className="font-medium text-sm">Soft:</div>
                      <div className="text-sm">{data.skills.soft.join(", ")}</div>
                    </div>
                  )}
                  {data.skills.tools.length > 0 && (
                    <div>
                      <div className="font-medium text-sm">Tools:</div>
                      <div className="text-sm">{data.skills.tools.join(", ")}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="w-2/3 bg-white p-6">
            {/* Summary */}
            {hasSummary && (
              <div className="mb-4">
                <h2 className={`${getTemplateClass("text-base font-semibold pb-1 mb-2")}`} style={{ borderBottom: `2px solid ${accentColor}` }}>
                  SUMMARY
                </h2>
                <p>{data.summary}</p>
              </div>
            )}

            {/* Education */}
            {hasEducation && (
              <div className="mb-4">
                <h2 className={`${getTemplateClass("text-base font-semibold pb-1 mb-2")}`} style={{ borderBottom: `2px solid ${accentColor}` }}>
                  EDUCATION
                </h2>
                <div className="space-y-2">
                  {data.education.map((edu: EducationEntry, index: number) => {
                    // Skip empty education entries
                    if (edu.institution.trim() === "" && edu.degree.trim() === "" && edu.year.trim() === "") {
                      return null;
                    }
                    return (
                      <div key={index}>
                        <div className="flex justify-between">
                          <span className="font-medium">{edu.institution || "Institution"}</span>
                          <span>{edu.year || "Year"}</span>
                        </div>
                        <div>{edu.degree || "Degree"}</div>
                      </div>
                    );
                  }).filter(Boolean)}
                </div>
              </div>
            )}

            {/* Experience */}
            {hasExperience && (
              <div className="mb-4">
                <h2 className={`${getTemplateClass("text-base font-semibold pb-1 mb-2")}`} style={{ borderBottom: `2px solid ${accentColor}` }}>
                  EXPERIENCE
                </h2>
                <div className="space-y-3">
                  {data.experience.map((exp: ExperienceEntry, index: number) => {
                    // Skip empty experience entries
                    if (exp.company.trim() === "" && exp.position.trim() === "" && exp.description.trim() === "") {
                      return null;
                    }
                    return (
                      <div key={index}>
                        <div className="flex justify-between">
                          <span className="font-medium">{exp.position || "Position"}</span>
                          <span>{exp.duration || "Duration"}</span>
                        </div>
                        <div className="font-medium text-gray-700">{exp.company || "Company"}</div>
                        <div className="mt-1">{exp.description || "Description"}</div>
                      </div>
                    );
                  }).filter(Boolean)}
                </div>
              </div>
            )}

            {/* Projects */}
            {hasProjects && (
              <div className="mb-4">
                <h2 className={`${getTemplateClass("text-base font-semibold pb-1 mb-2")}`} style={{ borderBottom: `2px solid ${accentColor}` }}>
                  PROJECTS
                </h2>
                <div className="space-y-2">
                  {data.projects.map((proj: ProjectEntry, index: number) => {
                    // Skip empty project entries
                    if (proj.title.trim() === "" && proj.description.trim() === "" && proj.liveUrl.trim() === "" && proj.githubUrl.trim() === "") {
                      return null;
                    }
                    return (
                      <div key={index}>
                        <div className="flex justify-between">
                          <span className="font-medium">{proj.title || "Project Title"}</span>
                          <div className="flex space-x-2">
                            {proj.liveUrl && (
                              <span className="text-blue-600">🌐</span>
                            )}
                            {proj.githubUrl && (
                              <span className="text-gray-600">🔗</span>
                            )}
                          </div>
                        </div>
                        <div>{proj.description || "Project description"}</div>
                        {proj.techStack && proj.techStack.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {proj.techStack.map((tech, techIdx) => (
                              <span key={techIdx} className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }).filter(Boolean)}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Classic and Minimal templates */
        <div>
          {/* Header */}
          <div className="border-b pb-4 mb-4" style={template === 'classic' ? { borderBottom: `2px solid ${accentColor}` } : {}}>
            <h1 className={`${getTemplateClass("text-2xl font-bold text-center print:text-2xl")} ${(template === 'minimal') ? 'uppercase tracking-wide' : ''} print:uppercase print:tracking-wide`}>
              {data.personalInfo.name || "Your Name"}
            </h1>
            <div className="flex justify-center space-x-6 mt-2 text-gray-600">
              {data.personalInfo.email && <span className="print:text-black">{data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span className="print:text-black">{data.personalInfo.phone}</span>}
              {data.personalInfo.location && <span className="print:text-black">{data.personalInfo.location}</span>}
            </div>
            {(data.links.github || data.links.linkedin) && (
              <div className="flex justify-center mt-2 space-x-4 text-gray-600">
                {data.links.github && <span className="print:text-black">GitHub: {data.links.github}</span>}
                {data.links.linkedin && <span className="print:text-black">LinkedIn: {data.links.linkedin}</span>}
              </div>
            )}
          </div>

          {/* Summary */}
          {hasSummary && (
            <div className="mb-4">
              <h2 className={`${getTemplateClass("text-lg font-semibold pb-1 mb-2")}`} style={template === 'classic' ? { borderBottom: `2px solid ${accentColor}` } : {}}>
                SUMMARY
              </h2>
              <p>{data.summary}</p>
            </div>
          )}

          {/* Skills */}
          {hasSkills && (
            <div className="mb-4">
              <h2 className={`${getTemplateClass("text-lg font-semibold pb-1 mb-2")}`} style={template === 'classic' ? { borderBottom: `2px solid ${accentColor}` } : {}}>
                SKILLS
              </h2>
              <div>
                {data.skills.technical.length > 0 && (
                  <div className="mb-2">
                    <span className="font-medium">Technical: </span>
                    {data.skills.technical.join(", ")}
                  </div>
                )}
                {data.skills.soft.length > 0 && (
                  <div className="mb-2">
                    <span className="font-medium">Soft: </span>
                    {data.skills.soft.join(", ")}
                  </div>
                )}
                {data.skills.tools.length > 0 && (
                  <div>
                    <span className="font-medium">Tools: </span>
                    {data.skills.tools.join(", ")}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Education */}
          {hasEducation && (
            <div className="mb-4">
              <h2 className={`${getTemplateClass("text-lg font-semibold pb-1 mb-2")}`} style={template === 'classic' ? { borderBottom: `2px solid ${accentColor}` } : {}}>
                EDUCATION
              </h2>
              <div className="space-y-2">
                {data.education.map((edu: EducationEntry, index: number) => {
                  // Skip empty education entries
                  if (edu.institution.trim() === "" && edu.degree.trim() === "" && edu.year.trim() === "") {
                    return null;
                  }
                  return (
                    <div key={index}>
                      <div className="flex justify-between">
                        <span className="font-medium">{edu.institution || "Institution"}</span>
                        <span>{edu.year || "Year"}</span>
                      </div>
                      <div>{edu.degree || "Degree"}</div>
                    </div>
                  );
                }).filter(Boolean)}
              </div>
            </div>
          )}

          {/* Experience */}
          {hasExperience && (
            <div className="mb-4">
              <h2 className={`${getTemplateClass("text-lg font-semibold pb-1 mb-2")}`} style={template === 'classic' ? { borderBottom: `2px solid ${accentColor}` } : {}}>
                EXPERIENCE
              </h2>
              <div className="space-y-3">
                {data.experience.map((exp: ExperienceEntry, index: number) => {
                  // Skip empty experience entries
                  if (exp.company.trim() === "" && exp.position.trim() === "" && exp.description.trim() === "") {
                    return null;
                  }
                  return (
                    <div key={index}>
                      <div className="flex justify-between">
                        <span className="font-medium">{exp.position || "Position"}</span>
                        <span>{exp.duration || "Duration"}</span>
                      </div>
                      <div className="font-medium text-gray-700">{exp.company || "Company"}</div>
                      <div className="mt-1">{exp.description || "Description"}</div>
                    </div>
                  );
                }).filter(Boolean)}
              </div>
            </div>
          )}

          {/* Projects */}
          {hasProjects && (
            <div className="mb-4">
              <h2 className={`${getTemplateClass("text-lg font-semibold pb-1 mb-2")}`} style={template === 'classic' ? { borderBottom: `2px solid ${accentColor}` } : {}}>
                PROJECTS
              </h2>
              <div className="space-y-2">
                {data.projects.map((proj: ProjectEntry, index: number) => {
                  // Skip empty project entries
                  if (proj.title.trim() === "" && proj.description.trim() === "" && proj.liveUrl.trim() === "" && proj.githubUrl.trim() === "") {
                    return null;
                  }
                  return (
                    <div key={index}>
                      <div className="flex justify-between">
                        <span className="font-medium">{proj.title || "Project Title"}</span>
                        <div className="flex space-x-2">
                          {proj.liveUrl && (
                            <span className="text-blue-600">🌐</span>
                          )}
                          {proj.githubUrl && (
                            <span className="text-gray-600">🔗</span>
                          )}
                        </div>
                      </div>
                      <div>{proj.description || "Project description"}</div>
                      {proj.techStack && proj.techStack.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {proj.techStack.map((tech, techIdx) => (
                            <span key={techIdx} className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }).filter(Boolean)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}