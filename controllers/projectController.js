const Project = require('../models/project');
const csv = require('fast-csv');
const fs = require('fs');
const multer = require('multer');

module.exports.getAllProjects = async (req, res) => {
  const projects = await Project.find();
  res.status(200).json({ status: 'success', results: projects.length, data: projects });
};

module.exports.createProject = async (req, res) => {
  const newProject = await Project.create(req.body);
  res.status(201).json({ status: 'success', data: newProject });
};

module.exports.exportProjectsToCSV = async (req, res) => {
  const projects = await Project.find();
  const csvStream = csv.format({ headers: true });
  
  res.setHeader('Content-Type', 'text/csv');
  csvStream.pipe(res);
  
  projects.forEach(project => {
    csvStream.write(project.toObject());
  });
  
  csvStream.end();
};



module.exports.importProjectsFromCSV = async (req, res) => {
  const projects = [];
  csv.parseString(req.file.buffer.toString(), { headers: true })
    .on('data', row => projects.push(row))
    .on('end', async () => {
      await Project.insertMany(projects);
      res.status(200).json({ status: 'success', message: 'Projects imported successfully' });
    });
};
