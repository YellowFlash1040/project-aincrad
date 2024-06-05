import multer from 'multer';
import { nanoid } from 'nanoid';

const multerConfig = multer.diskStorage({
  destination: './tmp',
  filename: (req, file, setName) => {
    const extension = file.originalname.split('.').pop();
    const newFileName = `${req.user ? req.user.id : nanoid()}.${extension}`;
    setName(null, newFileName);
  }
});

export const upload = multer({
  storage: multerConfig
});

export default upload;
