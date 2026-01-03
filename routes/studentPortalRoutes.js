import express from 'express';
import { savePersonalInfo, getPersonalInfo } from '../controllers/studentPortal/personalInfo.js';
import { saveEducation, getEducation } from '../controllers/studentPortal/educationController.js';
import { saveExperience, getExperience } from '../controllers/studentPortal/experienceController.js';
import { saveSkills, getSkills } from '../controllers/studentPortal/skillsController.js';
import { saveProjects, getProjects } from '../controllers/studentPortal/projectsController.js';
import { getFullStudentProfile, initializeStudentPortal } from '../controllers/studentPortal/studentPortalController.js';

const router = express.Router()


// Personal Info Routes
router.post('/personal-info', savePersonalInfo);
router.get('/personal-info/:email', getPersonalInfo);

// Education Routes
router.post('/education', saveEducation);
router.get('/education/:id', getEducation);

// Experience Routes
router.post('/experience', saveExperience);
router.get('/experience/:id', getExperience);

// Skills Routes
router.post('/skills', saveSkills);
router.get('/skills/:id', getSkills);

// Projects Routes
router.post('/projects', saveProjects);
router.get('/projects/:id', getProjects);

// Master Portal Routes
router.post('/initialize', initializeStudentPortal);
router.get('/profile/:userId', getFullStudentProfile);

export default router;