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
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="font-sans text-sm">
      {/* Header */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-center">{data.personalInfo.name || "Your Name"}</h1>
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
      {data.summary && data.summary.trim() !== "" && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b pb-1">SUMMARY</h2>
          <p className="mt-2">{data.summary}</p>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.some(edu => 
        edu.institution.trim() !== "" || edu.degree.trim() !== "" || edu.year.trim() !== ""
      ) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b pb-1">EDUCATION</h2>
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
      {data.experience && data.experience.some(exp => 
        exp.company.trim() !== "" || exp.position.trim() !== "" || exp.description.trim() !== ""
      ) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b pb-1">EXPERIENCE</h2>
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
      {data.projects && data.projects.some(proj => 
        proj.name.trim() !== "" || proj.description.trim() !== "" || proj.link.trim() !== ""
      ) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b pb-1">PROJECTS</h2>
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
      {data.skills && data.skills.trim() !== "" && (
        <div>
          <h2 className="text-lg font-semibold border-b pb-1">SKILLS</h2>
          <div className="mt-2">
            {data.skills}
          </div>
        </div>
      )}
    </div>
  );
}