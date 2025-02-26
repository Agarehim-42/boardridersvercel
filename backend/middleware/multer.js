import multer from "multer";
import fs from "fs"; //filesystem
import path from "path";

//fs

// Upload qovluğunun tam yolunu əldə etmək üçün
const uploadDirectory = path.resolve('uploads'); // Kök qovluğunda uploads yaradılacaq

// Upload qovluğu yoxlanacaq və yaradılacaq
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Multer konfiqurasiyası
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Fayllar burada saxlanacaq
  },
  filename: (req, file, cb) => {
    // 14122024160854_6352453264523
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1E9); // Unikal ad yaratmaq
    const fileExtension = path.extname(file.originalname); // Faylın genişlənməsini əldə etmək
    cb(null, `${uniqueSuffix}${fileExtension}`); // Unikal ad + genişlənmə
  },
});

// `multer`-i fayl növlərini və ölçüsünü məhdudlaşdıraraq konfiqurasiya edirik
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum fayl ölçüsü 5MB
  fileFilter: (req, file, cb) => {
    // MimeTypes
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']; // İcazə verilən fayl növləri
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Yalnız şəkil formatları yükləyə bilərsiniz!'), false);
    }
  }
}).array('newImages'); // Çoxsaylı şəkilləri qəbul etmək üçün

export const uploadImages = upload;
