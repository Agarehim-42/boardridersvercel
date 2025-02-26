import React, { useState } from "react";
import { useAddProductMutation, useGetProductsQuery } from "../../redux/api/productsApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const initialState = {
    name: "",
    price: "",
    description: "",
    category: "",
    seller: "",
    stock: "",
    ratings: "", // Reytinq üçün state əlavə edildi
    ageRange: "",
    size: "",
    material: "",
    color: "",
    style: "",
    pattern: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [images, setImages] = useState([]);
  const [addProduct] = useAddProductMutation();
  const { refetch } = useGetProductsQuery();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    images.forEach((image) => form.append("newImages", image));

    try {
      await addProduct(form).unwrap();
      Swal.fire({
        title: "Uğurla əlavə edildi!",
        text: "Məhsul uğurla əlavə edildi.",
        icon: "success",
        confirmButtonText: "Tamam",
      });
      navigate("/admin/adminproducts");
      await refetch();
      setFormData(initialState);
      setImages([]);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Xəta!",
        text: "Məhsul əlavə edilərkən xəta baş verdi.",
        icon: "error",
        confirmButtonText: "Tamam",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Yeni Məhsul Əlavə Et</h2>
      <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Ad"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="price"
          placeholder="Qiymət"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          name="description"
          placeholder="Açıqlama"
          value={formData.description}
          onChange={handleInputChange}
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
          placeholder="Satıcı"
          value={formData.seller}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stok"
          value={formData.stock}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {/* Reytinq sahəsi */}
        <input
          type="number"
          name="ratings"
          placeholder="Reytinq (0-5)"
          value={formData.ratings}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        {formData.category === "Children" && (
          <>
            <input
              type="text"
              name="ageRange"
              placeholder="Yaş Aralığı (məs: 3-6)"
              value={formData.ageRange}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="size"
              placeholder="Ölçü (məs: M, L, XL)"
              value={formData.size}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="material"
              placeholder="Material"
              value={formData.material}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </>
        )}

        {(formData.category === "Men" || formData.category === "Women") && (
          <>
            <input
              type="text"
              name="size"
              placeholder="Ölçü (məs: M, L, XL)"
              value={formData.size}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="material"
              placeholder="Material"
              value={formData.material}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="color"
              placeholder="Rəng"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="style"
              placeholder="Stil"
              value={formData.style}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </>
        )}

        {formData.category === "Women" && (
          <input
            type="text"
            name="pattern"
            placeholder="Desen (opsional)"
            value={formData.pattern}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        )}

        <input
          onChange={handleFileChange}
          name="newImages"
          type="file"
          multiple
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        {images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Əlavə Et
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
