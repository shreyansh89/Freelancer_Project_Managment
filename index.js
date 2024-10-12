const express = require('express');

const port = 8000;

const app = express();

const db = require("./config/mongoose");


const UserRoutes = require('./routes/user');

const ProjectRoutes = require('./routes/project');

const PaymentRoutes = require('./routes/payment');

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/project', ProjectRoutes);
app.use('/api/v1/payment', PaymentRoutes);


app.listen(port, () => console.log('Server is running on port 8000'));