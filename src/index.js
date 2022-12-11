import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import { projectUpload } from './utils/multer.js';

dotenv.config();

const app = express();

app.use('/projects', express.static('projects'))

app.post('/api/project', projectUpload.single('image'), (req, res) => {
	const url = `${process.env.HOST}:${process.env.PORT}/${req.file.path}`

	console.log(req.file);
	res.status(200).json({ imageInfo: {
		url,
		name: req.file.filename
	} });
})
app.delete('/api/project/:name', (req, res, next) => {
	const filename = req.params.name;
	const dir = './projects';
	let error = null;

	fs.unlink(`${dir}/${filename}`, (err) => {
		error = err;
	});

	if (error) {
		res.status(400).send(err);
		return;
	}

	res.status(200).send('success');
})
app.post('/api/chapter', (req, res) => {})

app.listen(5001, console.log('bucket is up'));