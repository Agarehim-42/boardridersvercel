import catchAsyncErrors from "../middleware/catchAsyncErrors.js"
import { Product } from "../model/Product.js"
import cloudinary from "../utils/cloudinary.js"
import ErrorHandler from "../utils/errorHandler.js"

// Məhsulları əldə etmək
export const getProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find()

  if (!products) {
    return next(new ErrorHandler("Məhsullar yoxdur", 404))
  }

  res.status(200).json({
    success: true,
    products,
  })
})

// Məhsulu əldə etmək
export const getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id)

  if (!product) {
    return next(new ErrorHandler("Məhsul tapilmadi", 404))
  }

  res.status(200).json({
    success: true,
    product,
  })
})

// Məhsulu silmək
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id)

  if (!product) {
    return next(new ErrorHandler("Məhsul tapilmadi", 404))
  }

  // Cloudinary'dən şəkilləri silmək
  if (product.images && product.images.length > 0) {
    for (const image of product.images) {
      try {
        await cloudinary.v2.uploader.destroy(image.public_id)
      } catch (cloudinaryError) {
        console.error(`Cloudinary-dən ${image.public_id} id-li şəkil silinərkən xəta:`, cloudinaryError)
      }
    }
  }

  // Məhsulu verilənlər bazasından silmək
  await Product.deleteOne({ _id: req?.params?.id })

  res.status(200).json({
    success: true,
    message: "Məhsul uğurla silindi",
  })
})

// Yeni məhsul yaratmaq
export const createProduct = catchAsyncErrors(async (req, res, next) => {
  const images = []

  // Şəkil yükləmək
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      try {
        // Buffer-i base64 formatına çeviririk
        const b64 = Buffer.from(file.buffer).toString("base64")
        const dataURI = `data:${file.mimetype};base64,${b64}`

        const result = await cloudinary.v2.uploader.upload(dataURI, {
          folder: "products",
          resource_type: "auto",
          quality: "auto:good",
          fetch_format: "auto",
        })

        images.push({
          public_id: result.public_id,
          url: result.secure_url,
        })
      } catch (error) {
        console.error("Şəkil yüklənməsi xətası:", error)
        return next(new ErrorHandler("Şəkil yüklənmədi", 500))
      }
    }
  }

  // Yeni məhsul yaratmaq
  const product = await Product.create({
    ...req.body,
    images,
    user: req.user?._id, // Əgər authentication varsa
  })

  res.status(201).json({
    success: true,
    message: "Məhsul uğurla yaradıldı",
    product,
  })
})

export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id

  let product = await Product.findById(productId)
  if (!product) {
    return next(new ErrorHandler("Məhsul tapılmadı", 404))
  }

  // Köhnə şəkilləri silmək
  if (req.body.existingImages) {
    try {
      const existingImages = JSON.parse(req.body.existingImages)
      for (const image of existingImages) {
        await cloudinary.v2.uploader.destroy(image.public_id)
      }
    } catch (error) {
      console.error("Köhnə şəkilləri silmə xətası:", error)
    }
  }

  // Yeni şəkilləri yüklə
  const imagesLinks = []
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      try {
        const b64 = Buffer.from(file.buffer).toString("base64")
        const dataURI = `data:${file.mimetype};base64,${b64}`

        const result = await cloudinary.v2.uploader.upload(dataURI, {
          folder: "products",
          resource_type: "auto",
          quality: "auto:good",
          fetch_format: "auto",
        })

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        })
      } catch (error) {
        console.error("Yeni şəkil yüklənməsi xətası:", error)
        return next(new ErrorHandler("Şəkil yüklənmədi", 500))
      }
    }
  }

  // Məhsul məlumatlarını yenilə
  const updatedData = { ...req.body }
  if (imagesLinks.length > 0) {
    updatedData.images = imagesLinks
  }

  // Məhsulu yenilə
  product = await Product.findByIdAndUpdate(productId, updatedData, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    message: "Məhsul uğurla yeniləndi",
    product,
  })
})

// Məhsullar üzərində axtarış
export const searchProducts = catchAsyncErrors(async (req, res, next) => {
  const { query, page = 1, limit = 10 } = req.query

  if (!query) {
    return next(new ErrorHandler("Axtarış sorğusu daxil edin", 400))
  }

  const searchRegex = new RegExp(query, "i")
  const skip = (page - 1) * limit

  const products = await Product.find({
    name: { $regex: searchRegex },
  })
    .skip(skip)
    .limit(Number.parseInt(limit))

  const totalProducts = await Product.countDocuments({
    name: { $regex: searchRegex },
  })

  if (products.length === 0) {
    return next(new ErrorHandler("Aramanızla eşleşen ürün bulunamadı", 404))
  }

  res.status(200).json({
    success: true,
    message: "Arama sonuçları başarıyla getirildi",
    products,
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: Number.parseInt(page),
  })
})

// Rəy əlavə etmək və ya yeniləmək
export const createOrUpdateReview = catchAsyncErrors(async (req, res, next) => {
  const { productId, rating, comment } = req.body

  const product = await Product.findById(productId)
  if (!product) {
    return next(new ErrorHandler("Məhsul tapılmadı", 404))
  }

  const review = {
    user: req.user ? req.user._id : req.body.user,
    rating: Number(rating),
    comment,
  }

  const existingReviewIndex = product.reviews.findIndex((rev) => rev.user.toString() === review.user.toString())

  if (existingReviewIndex !== -1) {
    product.reviews[existingReviewIndex].rating = review.rating
    product.reviews[existingReviewIndex].comment = review.comment
  } else {
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }

  // Ümumi rəy ortalaması hesablanır
  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

  await product.save({ validateBeforeSave: false })

  res.status(200).json({
    success: true,
    message: "Rəy uğurla əlavə edildi/güncəlləndi",
  })
})

// Məhsulun rəylərini əldə etmək
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id

  const product = await Product.findById(productId)

  if (!product) {
    return next(new ErrorHandler("Məhsul tapılmadı", 404))
  }

  res.status(200).json({
    success: true,
    message: "Məhsulun rəyləri uğurla gətirildi",
    reviews: product.reviews,
    ratings: product.ratings,
    numOfReviews: product.numOfReviews,
  })
})
