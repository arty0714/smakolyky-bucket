import express from 'express';
import dotenv from 'dotenv';
import { projectUpload } from './utils/multer.js';

dotenv.config();

const app = express();

app.use('/projects', express.static('projects'))

app.post('/api/project', projectUpload.single('image'), (req, res) => {
	const url = `${process.env.HOST}:${process.env.PORT}/${req.file.path}`

	res.status(200).json({ url });
})
app.post('/api/chapter', (req, res) => {})

app.listen(5001, console.log('bucket is up'));