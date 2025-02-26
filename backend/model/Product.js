import mongoose from "mongoose";

// Discriminator üçün ümumi seçimlər
const options = { discriminatorKey: "category", timestamps: true };

// Əsas məhsul schema (ümumi xassələr)
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Məhsul adını daxil edin"],
      maxLength: [255, "Məhsulun adı 255 simvoldan çox ola bilməz"],
    },
    price: {
      type: Number,
      required: [true, "Qiyməti daxil edin"],
    },
    description: {
      type: String,
      required: [true, "Açıqlama hissəsini daxil edin"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    category: {
      type: String,
      required: [true, "Kateqoriyanı seçməlisiniz"],
      // Yeni kateqoriyalar: Children, Men, Women
      enum: ["Children", "Men", "Women"],
    },
    seller: {
      type: String,
      required: [true, "Məhsulu satan şirkəti daxil edin"],
    },
    stock: {
      type: Number,
      required: [true, "Stok miqdarını daxil edin"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
        },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  options
);

const Product = mongoose.model("Product", productSchema);

/* ----------------------------- Children Discriminator ----------------------------- */
const childrenSchema = new mongoose.Schema({
  ageRange: {
    type: String,
    required: [true, "Yaş aralığını daxil edin"],
  },
  size: {
    type: String,
    required: [true, "Ölçü məlumatını daxil edin"],
  },
  material: {
    type: String,
    required: [true, "Material məlumatını daxil edin"],
  },
});
const Children = Product.discriminator("Children", childrenSchema);

/* ----------------------------- Men Discriminator ----------------------------- */
const menSchema = new mongoose.Schema({
  size: {
    type: String,
    required: [true, "Ölçü məlumatını daxil edin"],
  },
  material: {
    type: String,
    required: [true, "Material məlumatını daxil edin"],
  },
  color: {
    type: String,
    required: [true, "Rəng məlumatını daxil edin"],
  },
  style: {
    type: String,
    required: [true, "Stil məlumatını daxil edin"],
  },
});
const Men = Product.discriminator("Men", menSchema);

/* ----------------------------- Women Discriminator ----------------------------- */
const womenSchema = new mongoose.Schema({
  size: {
    type: String,
    required: [true, "Ölçü məlumatını daxil edin"],
  },
  material: {
    type: String,
    required: [true, "Material məlumatını daxil edin"],
  },
  color: {
    type: String,
    required: [true, "Rəng məlumatını daxil edin"],
  },
  style: {
    type: String,
    required: [true, "Stil məlumatını daxil edin"],
  },
  pattern: {
    type: String,
    // Desen məlumatı optional ola bilər
  },
});
const Women = Product.discriminator("Women", womenSchema);

export { Product, Children, Men, Women };
