import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
const AddCategory: React.FC = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Category name is required');
      return;
    }
    if (!image) {
      setError('Image is required');
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      const response = await axios.post(
        'http://localhost:8000/products/categories',
        formData);
      console.log('Category added:', response.data);
      toast.success('Category added successfully!');
      setName('');
      setImage(null);
      setPreview('');
    } catch (err) {
      console.error('Error adding category:', err);
      setError('Failed to add category');
    }

  };

  return (
    <div className={`min-vh-100 py-5 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      {/* <Toaster position="top-right" /> */}
      <div className="container">
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'} me-2`}></i>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <div className={`card shadow p-4 mx-auto ${darkMode ? 'bg-secondary text-white' : 'bg-white'}`} style={{ maxWidth: '500px', borderRadius: '12px' }}>
          <h3 className="text-center mb-4">
            <i className="bi bi-folder-plus me-2"></i>Add Category
          </h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="category-name" className="form-label">
                <i className="bi bi-tag me-2"></i>Category Name
              </label>
              <input
                type="text"
                id="category-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category-image" className="form-label">
                <i className="bi bi-image me-2"></i>Category Image
              </label>
              <input
                type="file"
                id="category-image"
                accept="image/*"
                onChange={handleImageChange}
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
              />
            </div>

            {preview && (
              <div className="mb-3 text-center">
                <img src={preview} alt="Preview" className="img-thumbnail" style={{ maxHeight: '200px' }} />
              </div>
            )}

            <button type="submit" className="btn btn-success w-100">
              <i className="bi bi-plus-circle me-2"></i>Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
