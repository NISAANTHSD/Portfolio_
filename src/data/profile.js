// All portfolio content lives here — edit this file to update the site.
// Anything not confirmed is left out on purpose (no invented links or stats).

export const profile = {
  name: 'Nisaanth S D',
  firstName: 'Nisaanth',
  initials: 'SDN',
  tagline: 'Building Modern Web & Mobile Applications Through Code.',
  heroTitle: 'Aspiring Full Stack Developer & App Developer',
  heroSub: 'Building Modern Web Experiences and Mobile Applications.',
  roles: ['Full Stack Developer', 'App Developer', 'Creative Developer'],
  location: 'Erode, Tamil Nadu',
  email: 'nisaanth2307@gmail.com',
  phone: '+91 90428 46411',
  phoneHref: 'tel:+919042846411',
  resume: 'Nisaanth_SD_Resume.pdf',
  links: {
    github: 'https://github.com/NISAANTHSD',
    linkedin: 'https://www.linkedin.com/in/nisaanth-s-d-498313381/',
    leetcode: 'https://leetcode.com/u/Me4MkEFXN6',
  },
  about: [
    'I am a Computer Science and Engineering student at Bannari Amman Institute of Technology, passionate about full-stack web development and mobile application development.',
    'I enjoy building modern, user-friendly web applications and mobile apps while exploring new technologies and improving my development skills — one project at a time.',
  ],
  facts: [
    { label: 'Based in', value: 'Erode, Tamil Nadu' },
    { label: 'Currently', value: 'Building TripZo' },
    { label: 'Studying', value: 'B.E. CSE · 2025 – 2029' },
  ],
}

// Three-step scroll showcase under the hero
export const pillars = [
  { id: '01', word: 'WEB', line: 'Responsive interfaces built with React, HTML, CSS & JavaScript.' },
  { id: '02', word: 'MOBILE', line: 'Mobile apps with Flutter & Dart — learning by building.' },
  { id: '03', word: 'SHIP', line: 'From an idea on paper to something people can actually use.' },
]

export const featured = {
  name: 'TripZo',
  subtitle: 'Transport Management System',
  status: 'In progress',
  description:
    'A college transport management system with both a web app and a mobile app. TripZo brings transport requests, driver assignments and vehicle management into one place — including a dedicated EV / battery-vehicle request module.',
  features: [
    'Role-based access for different user types',
    'Transport request flow — raise, review, approve',
    'Driver assignment to trips and vehicles',
    'Vehicle management for the college fleet',
    'EV / battery-vehicle request module',
  ],
  meta: [
    { k: 'Status', v: 'Building' },
    { k: 'Platform', v: 'Web + Mobile' },
    { k: 'Focus', v: 'Campus transport' },
    { k: 'Module', v: 'EV requests' },
  ],
}

// links: only real links. Leave arrays empty when there is nothing public yet.
// tags: TODO — add the exact tech stack for Stranger Things.
export const projects = [
  {
    no: '01',
    name: 'Space Waves',
    kind: 'Browser Game',
    description: 'An interactive browser-based game built with React and Vite — dodge, weave and survive the waves.',
    tags: ['React', 'Vite', 'JavaScript'],
    links: [
      { label: 'Live Demo', href: 'https://nisaanthsd.github.io/Space_Waves/' },
      { label: 'GitHub', href: 'https://github.com/NISAANTHSD/Space_Waves' },
    ],
    hue: 265,
  },
  {
    no: '02',
    name: 'Stranger Things',
    kind: 'Landing Page',
    description: 'A modern, responsive themed landing page with an atmospheric design inspired by the series.',
    tags: ['Responsive', 'Landing Page', 'Vercel'],
    links: [
      { label: 'Live Site', href: 'https://stranger-things-rust-tau.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/NISAANTHSD/Stranger-Things' },
    ],
    hue: 355,
  },
]

// level: honest self-assessment
export const skills = [
  { group: 'Frontend', level: 'Building projects', items: ['HTML', 'CSS', 'JavaScript', 'React.js'] },
  { group: 'Backend', level: 'Learning', items: ['Node.js', 'Express.js', 'SQL'] },
  { group: 'Mobile', level: 'Learning', items: ['Flutter (learning)', 'Dart'] },
  { group: 'Languages', level: 'Beginner', items: ['C', 'C++', 'Java', 'Python'] },
  { group: 'Tools', level: 'Daily use', items: ['Git', 'GitHub', 'VS Code', 'Vercel'] },
]

export const journey = [
  { when: 'Now', title: 'Building TripZo', place: 'Web + mobile transport management system', current: true },
  { when: 'Nov 2026', title: 'TN Skills Competition 2026', place: 'Level 1 · Web Technologies — Participant' },
  { when: 'Apr 2026', title: 'FusionX Hackathon 2026', place: 'Presidency University — built a working prototype with a team' },
  { when: '2025 – 2029', title: 'B.E. Computer Science & Engineering', place: 'Bannari Amman Institute of Technology, Sathyamangalam' },
  { when: 'May – Jul 2025', title: 'Programming Diploma · Grade A', place: 'CSC Computer Software College — C, C++, Java' },
  { when: '2024 – 2025', title: 'Higher Secondary (Class XII) · 88%', place: 'The Optimus Public School' },
]

export const certificates = [
  {
    title: 'FusionX Hackathon 2026',
    issuer: 'Presidency University · School of CSE',
    note: 'Certificate for Participation · April 2026',
    href: 'certificates/fusionx-hackathon-2026.png',
  },
  {
    title: 'Certificate of Merit',
    issuer: 'CSC Computer Software College',
    note: 'C, C++ & Java · Overall grade A · 2025',
    href: 'certificates/csc-programming-merit.pdf',
  },
  {
    title: 'TN Skills Competition 2026',
    issuer: 'Tamil Nadu Skill Development Corporation',
    note: 'Level 1 · Web Technologies · Participant',
    href: null,
  },
]
