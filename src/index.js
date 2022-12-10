import express from 'express';

const app = express();

app.post('api/project/:id', (req, res) => {})
app.post('api/project/:projectId/chapter/:chapterId', (req, res) => {})

app.listen(5001, console.log('bucket is up'));