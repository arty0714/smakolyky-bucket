import multer from 'multer';
import { v4 } from 'uuid';

const projectStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'projects');
	},
	filename: (req, file, cb) => {
		const newFileName = `${v4()}.${file.originalname}`;

		cb(null, newFileName);
	}
})

export const projectUpload = multer({ storage: projectStorage });