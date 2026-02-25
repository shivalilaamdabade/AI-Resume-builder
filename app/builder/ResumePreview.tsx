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
  name: string;
  description: string;
  link: string;
}

interface Links {
  github: string;
  linkedin: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: string;
  links: Links;
}

interface ResumePreviewProps {
  data: ResumeData;
  template?: string;
}

export default function ResumePreview({ data, template = 'classic' }: ResumePreviewProps) {
  // Filter out empty sections
  const hasSummary = data.summary && data.summary.trim() !== "";
  const hasEducation = data.education && data.education.some((edu: EducationEntry) => 
    edu.institution.trim() !== "" || edu.degree.trim() !== "" || edu.year.trim() !== ""
  );
  const hasExperience = data.experience && data.experience.some((exp: ExperienceEntry) => 
    exp.company.trim() !== "" || exp.position.trim() !== "" || exp.description.trim() !== ""
  );
  const hasProjects = data.projects && data.projects.some((proj: ProjectEntry) => 
    proj.name.trim() !== "" || proj.description.trim() !== "" || proj.link.trim() !== ""
  );
  const hasSkills = data.skills && data.skills.trim() !== "";
  const hasLinks = (data.links.github && data.links.github.trim() !== "") || 
                  (data.links.linkedin && data.links.linkedin.trim() !== "");

  // Define class based on template
  const getTemplateClass = (baseClass: string) => {
    if (template === 'modern') {
      return baseClass + ' font-sans';
    } else if (template === 'minimal') {
      return baseClass + ' font-serif';
    } else { // classic
      return baseClass + ' font-sans';
    }
  };

  return (
    <div className={getTemplateClass("text-sm")}>
      {/* Header */}
      <div className="border-b pb-4 mb-4">
        <h1 className={`${getTemplateClass("text-2xl font-bold text-center")} ${(template === 'minimal') ? 'uppercase tracking-wide' : ''}`}>
          {data.personalInfo.name || "Your Name"}
        </h1>
        <div className="flex justify-center space-x-6 mt-2 text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
        {data.links.github && (
          <div className="flex justify-center mt-1">
            <span className="text-gray-600">GitHub: {data.links.github}</span>
          </div>
        )}
        {data.links.linkedin && (
          <div className="flex justify-center mt-1">
            <span className="text-gray-600">LinkedIn: {data.links.linkedin}</span>
          </div>
        )}
      </div>

      {/* Summary */}
      {hasSummary && (
        <div className="mb-4">
          <h2 className={`${getTemplateClass("text-lg font-semibold border-b pb-1")} ${(template === 'minimal') ? 'uppercase tracking-wider text-xs' : ''}`}>
            SUMMARY
          </h2>
          <p className="mt-2">{data.summary}</p>
        </div>
      )}

      {/* Education */}
      {hasEducation && (
        <div className="mb-4">
          <h2 className={`${getTemplateClass("text-lg font-semibold border-b pb-1")} ${(template === 'minimal') ? 'uppercase tracking-wider text-xs' : ''}`}>
            EDUCATION
          </h2>
          <div className="mt-2 space-y-2">
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
          <h2 className={`${getTemplateClass("text-lg font-semibold border-b pb-1")} ${(template === 'minimal') ? 'uppercase tracking-wider text-xs' : ''}`}>
            EXPERIENCE
          </h2>
          <div className="mt-2 space-y-3">
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
          <h2 className={`${getTemplateClass("text-lg font-semibold border-b pb-1")} ${(template === 'minimal') ? 'uppercase tracking-wider text-xs' : ''}`}>
            PROJECTS
          </h2>
          <div className="mt-2 space-y-2">
            {data.projects.map((proj: ProjectEntry, index: number) => {
              // Skip empty project entries
              if (proj.name.trim() === "" && proj.description.trim() === "" && proj.link.trim() === "") {
                return null;
              }
              return (
                <div key={index}>
                  <div className="flex justify-between">
                    <span className="font-medium">{proj.name || "Project Name"}</span>
                    {proj.link && <span>{proj.link}</span>}
                  </div>
                  <div>{proj.description || "Project description"}</div>
                </div>
              );
            }).filter(Boolean)}
          </div>
        </div>
      )}

      {/* Skills */}
      {hasSkills && (
        <div>
          <h2 className={`${getTemplateClass("text-lg font-semibold border-b pb-1")} ${(template === 'minimal') ? 'uppercase tracking-wider text-xs' : ''}`}>
            SKILLS
          </h2>
          <div className="mt-2">
            {data.skills}
          </div>
        </div>
      )}
    </div>
  );
}