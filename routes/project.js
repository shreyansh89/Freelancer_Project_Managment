const express = require('express');
const router = express.Router();

const projectcontroller = require('../controllers/projectController');

const { protect } = require('../middlewares/authMiddleware');

const multer = require('multer');





router.get("/allprojects" , protect, projectcontroller.getAllProjects)
router.post("/create", protect, projectcontroller.createProject)

router.get('/export', protect, projectcontroller.exportProjectsToCSV);

const storage = multer.memoryStorage();
router.post('/import', protect, multer({ storage }).single('file'), projectcontroller.importProjectsFromCSV);



module.exports = router;