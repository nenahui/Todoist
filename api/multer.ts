import multer from 'multer';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { promises as fs } from 'fs';
import { config } from './config';

const imageStorage = multer.diskStorage({
  destination: async (req, file, callback) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, { recursive: true });
    callback(null, config.publicPath);
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const newFileName = randomUUID() + extension;
    callback(null, 'images/' + newFileName);
  },
});

export const imagesUpload = multer({ storage: imageStorage });
