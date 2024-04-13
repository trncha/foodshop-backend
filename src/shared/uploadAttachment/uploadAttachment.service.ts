import * as multer from 'multer';
import * as path from 'path';
const fs = require('fs');

export const diskStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadsDir = path.join('./uploads', file.fieldname);

		if (!fs.existsSync(uploadsDir)) {
			fs.mkdirSync(uploadsDir, { recursive: true });
		}
		cb(null, uploadsDir);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, uniqueSuffix + path.extname(file.originalname));
	},
});

