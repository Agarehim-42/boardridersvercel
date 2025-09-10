import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Cloudinary konfiqurasiyası
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Faylları Cloudinary-də saxlamaq üçün Multer konfiqurasiyası
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'boardriders-project', // Buludda faylların saxlanacağı qovluq
    allowed_formats: ['jpeg', 'png', 'gif', 'webp'],
  },
});

const upload = multer({ storage });

// Eksport etdiyiniz funksiyalar eyni qalır
export const uploadImages = upload.array('newImages', 10);
export const uploadSingle = upload.single('image');
export const uploadFields = upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'thumbnail', maxCount: 1 },
]);