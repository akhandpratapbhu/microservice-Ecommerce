// src/components/CategoryForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !image) {
    setError('Both category name and image are required');
    return;
  }

  const formData = new FormData();
  formData.append('name', name);
  formData.append('image', image);

  try {
    const response = await axios.post(
      'http://localhost:8000/products/categories',
      formData );
    console.log('Category added:', response.data);
    setName('');
    setImage(null);
    setError(null);
  } catch (err) {
    console.error('Error adding category:', err);
    setError('Failed to add category');
  }
};


  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Add Category</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="category-name" style={{ display: 'block' }}>
            Category Name
          </label>
          <input
            type="text"
            id="category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
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


        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
