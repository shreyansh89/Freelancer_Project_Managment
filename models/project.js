const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true ,
  },
  description: String,
  status: { 
    type: String, 
    default: 'pending', 
  },
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;