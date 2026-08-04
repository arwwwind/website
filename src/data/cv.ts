/**
 * Single source of truth for /cv and public/cv.pdf.
 * Edit cv.json, then run: node scripts/generate-cv-pdf.cjs
 */

import data from './cv.json';

export type SkillGroup = { label: string; items: string };

export type CvProject = {
  name: string;
  bullets: string[];
};

export type CvRole = {
  company: string;
  companyUrl?: string;
  role: string;
  dates: string;
  projects: CvProject[];
};

export type CvEducation = {
  degree: string;
  school: string;
  year: string;
};

export const cvMeta = data.meta;
export const cvAbout = data.about;
export const cvSkills = data.skills as SkillGroup[];
export const cvExperience = data.experience as CvRole[];
export const cvEducation = data.education as CvEducation;
export const cvRecognition = data.recognition;
