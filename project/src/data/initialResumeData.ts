import { ResumeData } from '../types/resume';

export const initialResumeData: ResumeData = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    jobTitle: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    location: 'San Francisco, CA',
    website: 'johndoe.com',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
  },
  summary: 'Experienced software engineer with a passion for creating elegant solutions to complex problems. Over 5 years of experience in full-stack development with expertise in React, Node.js, and cloud technologies.',
  education: [
    {
      id: 'edu-1',
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2015',
      endDate: '2019',
      description: 'Graduated with honors. Relevant coursework included Data Structures, Algorithms, Database Systems, and Web Development.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Tech Innovations Inc.',
      position: 'Senior Software Engineer',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description: 'Lead developer for the company\'s flagship product.',
      highlights: [
        'Architected and implemented a scalable backend system using Node.js and MongoDB',
        'Reduced page load time by 40% through performance optimizations',
        'Mentored junior developers and conducted code reviews',
      ],
    },
    {
      id: 'exp-2',
      company: 'Digital Solutions LLC',
      position: 'Software Developer',
      startDate: 'Jun 2019',
      endDate: 'Dec 2020',
      description: 'Worked on various client projects as a full-stack developer.',
      highlights: [
        'Built responsive web applications using React and Redux',
        'Implemented REST APIs using Express.js',
        'Collaborated with design team to create intuitive user interfaces',
      ],
    },
  ],
  skillGroups: [
    {
      id: 'sg-1',
      name: 'Programming Languages',
      skills: [
        { id: 'skill-1', name: 'JavaScript', level: 5 },
        { id: 'skill-2', name: 'TypeScript', level: 4 },
        { id: 'skill-3', name: 'Python', level: 3 },
      ],
    },
    {
      id: 'sg-2',
      name: 'Frameworks & Libraries',
      skills: [
        { id: 'skill-4', name: 'React', level: 5 },
        { id: 'skill-5', name: 'Node.js', level: 4 },
        { id: 'skill-6', name: 'Express', level: 4 },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'E-commerce Platform',
      description: 'Built a full-featured e-commerce platform with React, Node.js, and MongoDB.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
      link: 'github.com/johndoe/ecommerce',
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'native' },
    { id: 'lang-2', name: 'Spanish', proficiency: 'intermediate' },
  ],
};