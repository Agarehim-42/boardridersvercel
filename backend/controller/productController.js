import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { Product, Children, Men, Women } from "../model/Product.js";
import cloudinary from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
import fs from "fs";

// Məhsulları əldə etmək
export const getProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  if (!products) {
    return next(new ErrorHandler("Məhsullar yoxdur", 404));
  }
  res.status(200).json({
    products,
  });
});

// Məhsul detalları
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Məhsul tapilmadi", 404));
  }

  res.status(200).json({
    product,
  });
});

// Məhsulu silmək (ətraflı xəta idarəetməsi ilə)
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req?.params?.id);
    if (!product) {
      return res.status(404).json({
        error: "Məhsul tapilmadi",
      });
    }

    // Cloudinary'dən şəkilləri silmək (xəta baş verərsə log edilir və proses davam edir)
    if (product.images && product.images.length > 0) {
      for (let image of product.images) {
        try {
          await cloudinary.v2.uploader.destroy(image.public_id);
        } catch (cloudinaryError) {
          console.error(
            `Cloudinary-dən ${image.public_id} id-li şəkil silinərkən xəta:`,
            cloudinaryError
          );
          // Xəta baş verəndə belə, növbəti şəkilə keçirik.
        }
      }
    }

    // Məhsulu verilənlər bazasından silmək
    await Product.deleteOne({ _id: req?.params?.id });

    return res.status(200).json({
      message: "Məhsul uğurla silindi",
    });
  } catch (error) {
    console.error("deleteProduct funksiyasında xəta baş verdi:", error);
    return res.status(500).json({
      error: "Daxili server xətası",
      message: error.message,
    });
  }
});

// Yeni məhsul yaratmaq
export const newProduct = catchAsyncErrors(async (req, res, next) => {
  const images = [];

  // Şəkil yükləmək
  if (req.files) {
    for (let file of req.files) {
      try {
        // req.files bir buffer obyekti verir, onu base64 formatına çevirməliyik
        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;

        const result = await cloudinary.v2.uploader.upload(dataURI, {
          folder: "products",
        });
        images.push({ public_id: result.public_id, url: result.secure_url });

      } catch (error) {
        return res
          .status(500)
          .json({ error: "Şəkil yüklənmədi", message: error.message });
      }
    }
  }

  // Yeni məhsul yaratmaq
  const product = await Product.create({ ...req.body, images });

  res.status(201).json({
    success: true,
    product,
  });
});

// Məhsulu yeniləmək
export const updateProduct = catchAsyncErrors(async (req, res) => {
  const productId = req.params.id;

  // Məhsulu tap
  let product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ error: "Məhsul tapılmadı" });
  }

  if (req.body.existingImages) {
    const existingImages = JSON.parse(req.body.existingImages);
    for (let image of existingImages) {
      await cloudinary.v2.uploader.destroy(image.public_id); // Şəkilləri silmək
    }
  }

  // Yeni şəkilləri yüklə
  const imagesLinks = [];
  if (req.files && req.files.length > 0) {
    for (let file of req.files) {
      try {
        // req.files bir buffer obyekti verir, onu base64 formatına çevirməliyik
        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;

        const result = await cloudinary.v2.uploader.upload(dataURI, {
          folder: "products",
        });
        imagesLinks.push({ public_id: result.public_id, url: result.secure_url });

      } catch (error) {
        return res
          .status(500)
          .json({ error: "Şəkil yüklənmədi", message: error.message });
      }
    }
  }

  // Məhsul məlumatlarını yenilə
  const updatedData = { ...req.body };
  if (imagesLinks.length > 0) {
    updatedData.images = imagesLinks;
  }

  // Məhsulu yenilə
  product = await Product.findByIdAndUpdate(productId, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(500).json({ error: "Məhsul yenilənmədi" });
  }

  res.status(200).json({
    success: true,
    message: "Məhsul uğurla yeniləndi",
    product,
  });
});

// Məhsullar üzərində axtarış (Search Products)
export const searchProducts = catchAsyncErrors(async (req, res, next) => {
  const { query, page = 1, limit = 10 } = req.query;

  if (!query) {
    return next(new ErrorHandler("Lütfen bir arama sorgusu girin.", 400));
  }

  const searchRegex = new RegExp(query, "i");

  const products = await Product.find({
    name: { $regex: searchRegex },
  })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalProducts = await Product.countDocuments({
    name: { $regex: searchRegex },
  });

  if (products.length === 0) {
    return next(new ErrorHandler("Aramanızla eşleşen ürün bulunamadı.", 404));
  }

  res.status(200).json({
    success: true,
    message: "Arama sonuçları başarıyla getirildi.",
    products,
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
  });
});

export const createOrUpdateReview = catchAsyncErrors(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  // Ürün bulunuyor
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Məhsul tapılmadı", 404));
  }

  // İstifadəçi doğrulaması varsa req.user üzərindən, yoxsa body-dən user məlumatı alınır.
  const review = {
    user: req.user ? req.user._id : req.body.user,
    rating: Number(rating),
    comment,
  };

  // İstifadəçi artıq rəy əlavə edibsə, onu güncəlləyirik.
  const existingReviewIndex = product.reviews.findIndex(
    (rev) => rev.user.toString() === review.user.toString()
  );

  if (existingReviewIndex !== -1) {
    product.reviews[existingReviewIndex].rating = review.rating;
    product.reviews[existingReviewIndex].comment = review.comment;
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Ümumi rəy ortalaması hesablanır
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Rəy uğurla əlavə edildi/güncəlləndi",
  });
});

// Bir məhsulun bütün rəylərini və ortalama rating dəyərini əldə etmək
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;

  // Məhsulu tapırıq
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Məhsul tapılmadı", 404));
  }

  res.status(200).json({
    success: true,
    message: "Məhsulun rəyləri uğurla gətirildi",
    reviews: product.reviews,
    ratings: product.ratings,
    numOfReviews: product.numOfReviews,
  });
});
