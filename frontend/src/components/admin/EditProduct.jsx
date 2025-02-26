import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  useGetProductDetailsQuery, 
  useEditProductMutation, 
  useGetProductsQuery 
} from '../../redux/api/productsApi';
import Swal from 'sweetalert2';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductDetailsQuery(id);
  const { refetch } = useGetProductsQuery();
  const [editProduct, { isLoading: isUpdating }] = useEditProductMutation();

  // İlkin state: Ümumi sahələr və kateqoriyaya görə spesifik xassələr
  const initialState = {
    name: '',
    price: '',
    description: '',
    category: '',
    seller: '',
    stock: '',
    // Children üçün
    ageRange: '',
    // Men və Women üçün (ortaq sahələr)
    size: '',
    material: '',
    color: '',
    style: '',
    // Women üçün əlavə (opsional)
    pattern: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [newImages, setNewImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  // Serverdən gələn məlumatları state‑ə yükləyirik
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.product.name || '',
        price: data.product.price || '',
        description: data.product.description || '',
        category: data.product.category || '',
        seller: data.product.seller || '',
        stock: data.product.stock || '',
        ageRange: data.product.ageRange || '',
        size: data.product.size || '',
        material: data.product.material || '',
        color: data.product.color || '',
        style: data.product.style || '',
        pattern: data.product.pattern || ''
      });
    }
  }, [data]);

  // Input dəyişikliklərini state‑ə ötürür (checkbox dəstəyi ilə)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  // Yeni şəkillərin state‑ə yüklənməsi (əvvəlki seçimlərə əlavə olunur)
  const handleNewImagesChange = (e) => {
    setNewImages((prevImages) => [...prevImages, ...Array.from(e.target.files)]);
  };

  // Mövcud şəkillərin silinməsi/Geri alınması
  const handleRemoveExistingImage = (imageId) => {
    if (removedImages.includes(imageId)) {
      setRemovedImages(removedImages.filter((id) => id !== imageId));
    } else {
      setRemovedImages([...removedImages, imageId]);
    }
  };

  // Formun göndərilməsi: FormData-ya bütün sahələr, yeni şəkillər və silinəcək şəkillər əlavə olunur
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      updatedData.append(key, value);
    });
    newImages.forEach((image) => {
      updatedData.append("newImages", image);
    });
    removedImages.forEach((imageId) => {
      updatedData.append("removedImages", imageId);
    });

    try {
      await editProduct({ id, formData: updatedData }).unwrap();
      Swal.fire({
        title: "Uğurlu!",
        text: "Məhsul uğurla yeniləndi!",
        icon: "success",
      }).then(() => {
        navigate("/admin/adminproducts");
        refetch();
      });
    } catch (err) {
      console.error("Xəta:", err);
      Swal.fire({
        title: "Xəta!",
        text: "Məhsul yenilənmədi!",
        icon: "error",
      });
    }
  };

  if (isLoading) return <div>Yüklənir...</div>;
  if (error) return <div>Xəta baş verdi: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Məhsulu Redaktə Et</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {/* Ümumi sahələr */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Ad"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Qiymət"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Açıqlama"
          className="w-full p-2 border border-gray-300 rounded-md"
        ></textarea>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Kateqoriya Seç</option>
          <option value="Children">Children</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
        <input
          type="text"
          name="seller"
          value={formData.seller}
          onChange={handleInputChange}
          placeholder="Satıcı"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          placeholder="Stok"
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        {/* Kateqoriyaya görə spesifik sahələr */}
        {formData.category === "Children" && (
          <>
            <input
              type="text"
              name="ageRange"
              value={formData.ageRange}
              onChange={handleInputChange}
              placeholder="Yaş Aralığı (məs: 3-6)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              placeholder="Ölçü (məs: M, L, XL)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              placeholder="Material"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </>
        )}

        {(formData.category === "Men" || formData.category === "Women") && (
          <>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              placeholder="Ölçü (məs: M, L, XL)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              placeholder="Material"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              placeholder="Rəng"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="style"
              value={formData.style}
              onChange={handleInputChange}
              placeholder="Stil"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </>
        )}

        {formData.category === "Women" && (
          <input
            type="text"
            name="pattern"
            value={formData.pattern}
            onChange={handleInputChange}
            placeholder="Desen (opsional)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        )}

        {/* Mövcud şəkillərin göstərilməsi və silinməsi */}
        {data &&
          data.product &&
          data.product.images &&
          data.product.images.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {data.product.images
                .filter((img) => !removedImages.includes(img.public_id || img.id))
                .map((img) => (
                  <div key={img.public_id || img.id} className="relative">
                    <img
                      src={img.url}
                      alt={formData.name}
                      className="w-32 h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveExistingImage(img.public_id || img.id)
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white px-1"
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
          )}

        {/* Yeni şəkillərin yüklənməsi (birdən çox şəkil seçmək olur) */}
        <input
          type="file"
          multiple
          onChange={handleNewImagesChange}
          name="newImages"
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          {isUpdating ? "Yenilənir..." : "Yenilə"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
