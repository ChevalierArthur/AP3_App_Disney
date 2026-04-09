const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const config = require('./bdd.js');
app.use(express.json());
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors());
app.use(express.json());



app.use('/auth', require('./Routes/Auth.js'));
app.use('/users', require('./Routes/compte.js'));
app.use('/equipes', require('./Routes/equipes.js'));
app.use('/attractions', require('./Routes/attraction.js'));
app.use('/missions', require('./Routes/mission.js'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
