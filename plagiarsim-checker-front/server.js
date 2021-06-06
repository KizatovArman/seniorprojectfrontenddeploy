const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/plagiarism-checker-front'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: './dist/plagiarism-checker-front'}),
);

app.listen(process.env.PORT || 8080);