import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ATS-Uploads", // Cloudinary folder name
    format: async (req, file) => "pdf", // Change based on file type
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    resource_type : "raw"
  },
});

// Multer middleware for file upload
const upload = multer({ storage: storage });

export default upload;
