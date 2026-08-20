// TODO: replace the placeholder members and projects below with real content.
//
// `avatar: null`  -> renders a clean initials circle instead of an image.
// `image: null`   -> renders a generated monogram thumbnail instead of a screenshot.
// Drop in an image URL to override, or add the file under src/assets/ and
// `import shot from '../assets/shot.png'`.
import avatarKenth from '../assets/Condez_kenth.jpg';
import avatarKimberly from '../assets/Lopez_Kimberly.jpg';
import avatarRafael from '../assets/Bautista_Rafael.jpg';
import shotSopod from '../assets/POD.png';

export const teamMembers = [
  {
    id: 1,
    name: 'Kenth Condez',
    role: 'Lead Architect & Backend Developer',
    bio: 'Designs system architecture, backend services, and infrastructure with a focus on performance, reliability, and maintainability.',
    skills: ['Linux', 'React', 'Node.js', 'Ollama', 'AI Software Engineering'],
    avatar: avatarKenth,
    socials: {
      github: 'https://github.com/IamKier',
      linkedin: 'https://www.linkedin.com/in/kenthcondez/'
    }
  },
  {
    id: 2,
    name: 'Kimberly Lopez',
    role: 'Full Stack Developer',
    bio: 'Builds end-to-end web applications, from database design and backend logic to responsive user-facing interfaces.',
    skills: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Git', 'AI Software Engineering'],
    avatar: avatarKimberly,
    socials: {
      github: 'https://github.com/itsmeyanxi',
      linkedin: 'https://www.linkedin.com/in/lopezkcc714'
    }
  },
  {
    id: 3,
    name: 'Rafael Bautista',
    role: 'Front-end Developer & Multimedia Artist',
    bio: "Builds clean, responsive interfaces while supporting the team's visual identity through graphics and multimedia design.",
    skills: ['Blade', 'Tailwind CSS', 'JavaScript', 'Photoshop', 'Video Editing', 'AI Software Engineering'],
    avatar: avatarRafael,
    socials: {
      github: 'https://github.com/chuubs',
      linkedin: 'https://linkedin.com'
    }
  },
];

export const groupInfo = {
  title: 'About our group',
  tagline: 'We build fast, reliable software for the web.',
  description: 'A small software team focused on efficient, high-performance cross-platform applications and modern web solutions.',
  about: 'We are a dedicated software developer team focused on building efficient, high-performance cross-platform applications and modern web solutions using React and cutting-edge local technologies.',
  email: 'localgrp.dev@gmail.com',
  highlights: [
    { label: 'Focus', value: 'Web & cross-platform apps' },
    { label: 'Stack', value: 'React · Node.js · Linux' },
    { label: 'Team size', value: '3 developers' },
    { label: 'Availability', value: 'Open for projects' },
  ],
};

export const groupProjects = [
  {
    id: 1,
    title: 'Nomsuite Sopod',
    description: 'A business management platform for Meatplus Trading Corporation that unifies sales, purchasing, inventory, warehousing, deliveries, and finance into one system with role-based access, approval controls, and audit tracking.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Blade', 'JavaScript', 'Tailwind CSS'],
    image: shotSopod,
    links: {
      live: 'https://sopod-production.up.railway.app/login',
      source: 'https://github.com/LokalGrp/sopod',
    },
  },
  {
    id: 2,
    title: 'PASEI Warehouse',
    description: 'End-to-end traceability for dressed-bird production: floor weighing, QR-coded crate labels, scan-station receiving, storage and dispatch routing, and printable customer picklists.',
    tech: ['Laravel', 'PHP', 'Tailwind CSS', 'Vite', 'MariaDB'],
    image: null,
    links: {
      source: 'https://github.com/itsmeyanxi/pasei_warehouse',
    },
  },
  {
    id: 3,
    title: 'HRIS',
    description: 'An in-house HR platform built for Philippine compliance — employee records, an automated DTR engine, leave and overtime workflows, and employee self-service.',
    tech: ['Laravel', 'Next.js', 'TypeScript', 'MySQL'],
    image: null,
    links: {
      source: 'https://github.com/itsmeyanxi/meatplus-hris',
    },
  },
];
