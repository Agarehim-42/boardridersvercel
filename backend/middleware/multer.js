import multer from "multer";

// Faylları diskinizə deyil, birbaşa yaddaşa (memory) saxlamaq üçün Multer konfiqurasiyası.
// Bu, serverless mühitlərdə (Vercel kimi) qovluq yaratma xətasının qarşısını alır.
const storage = multer.memoryStorage();

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
