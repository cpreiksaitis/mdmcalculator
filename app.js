const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const dotenv = require('dotenv');
const cors = require('cors');
const openAIRequest = require('./api/openai-request');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));  // add this line

app.post('./api/openai-request', openAIRequest);

app.listen(3000, () => console.log('Server running on port 3000'));
