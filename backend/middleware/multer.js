import multer from "multer"

// Heç bir qovluq yaratmırıq, çünki Vercel-də fayl sisteminə yazma icazəsi yoxdur
const storage = multer.memoryStorage()

// Multer konfiqurasiyası - fayl növlərini və ölçüsünü məhdudlaşdırırıq
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maksimum fayl ölçüsü 5MB
    files: 10, // Maksimum 10 fayl
  },
  fileFilter: (req, file, cb) => {
    // İcazə verilən fayl növləri
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Yalnız şəkil formatları (JPEG, PNG, GIF, WebP) yükləyə bilərsiniz!"), false)
    }
  },
})

// Çoxsaylı şəkilləri qəbul etmək üçün
export const uploadImages = upload.array("newImages", 10)

// Tək şəkil üçün
export const uploadSingle = upload.single("image")

// İstəyə görə çoxsaylı sahələr üçün
export const uploadFields = upload.fields([
  { name: "images", maxCount: 10 },
  { name: "thumbnail", maxCount: 1 },
])
