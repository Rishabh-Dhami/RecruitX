import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage(
    {
        destination : (req, file, cb) => {
            cb(null, './public/temp');
        },
        filename: (req, file, cb) => {
            // Rename the file to include a timestamp
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const ext = path.extname(file.originalname); // Get file extension
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
    }
);

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only .jpeg, .png, and .gif formats are allowed!'), false); // Reject the file
    }
  };



  // Multer instance
const upload = multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
    },
    fileFilter,
  });
  
  // Middleware for single file upload
  
 export {upload}