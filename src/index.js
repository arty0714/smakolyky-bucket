import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import cors from 'cors'
import { projectUpload, chapterUpload } from './utils/multer.js';

dotenv.config();

const app = express();

app.use(cors());

app.use('/projects', express.static('projects'))
app.use('/chapters', express.static('chapters'))

app.post('/api/project', projectUpload.single('image'), (req, res) => {
	const url = `https://${process.env.HOST}/${req.file.path}`

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
app.post('/api/chapter', chapterUpload.single('image'), (req, res) => {
	const image = req.file;
	const url = `https://${process.env.HOST}/${image.path}`;
	const name = image.filename;
	
	const imageInfo = {
		url,
		name
	}
	console.log(imageInfo);

	res.status(200).json({ imageInfo });
})
app.delete('/api/chapter/:name', (req, res, next) => {
	const filename = req.params.name;
	const dir = './chapters';
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

app.listen(process.env.PORT, console.log(`bucket is up at port ${process.env.PORT}`));
