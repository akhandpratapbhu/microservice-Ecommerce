// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
const [image, setImage] = useState<File | null>(null);
  useEffect(() => {
    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) {
      setError('Both product name and image are required');
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('categoryId', categoryId);
    try {
      const response = await axios.post('http://localhost:8000/products/products', 
        formData
      );
      console.log('Product added:', response.data);
      // Clear form
      setName('');
      setPrice('');
      setDescription('');
      setCategoryId('');
      setImage(null)
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
          <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setImage(file);
          }
        }}
      />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

