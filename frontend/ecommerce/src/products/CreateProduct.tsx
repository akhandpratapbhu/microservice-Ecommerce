import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useTheme } from '../context-provider/themecontext';


interface Category {
  _id: string;
  name: string;
}

const CreateProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [qnty, setQnty] = useState('0');
 // const [darkMode, setDarkMode] = useState(true);
 const { darkMode } = useTheme();

  useEffect(() => {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !image) {
      toast.error('Product name and image are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('categoryId', categoryId);
    formData.append('qnty', qnty);

    try {
      const response = await axios.post('http://localhost:8000/products/products', formData);
      toast.success('Product added successfully!');
      // Reset form
      setName('');
      setPrice('');
      setDescription('');
      setCategoryId('');
      setImage(null);
      setPreview('');
      setQnty('0');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product.');
    }
  };

  return (
    <div className={`min-vh-100 py-5 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      {/* <Toaster position="top-right" /> */}
      <div className="container">
        {/* <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-outline-secondary" onClick={() => setDarkMode(!darkMode)}>
            <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'} me-2`}></i>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div> */}

        <div className={`card p-4 mx-auto shadow ${darkMode ? 'bg-secondary text-white' : 'bg-white'}`} style={{ maxWidth: '600px', borderRadius: '12px' }}>
          <h3 className="text-center mb-4">
            <i className="bi bi-bag-plus me-2"></i>Add Product
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Product Image</label>
              <input
                type="file"
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

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
                placeholder="Enter price"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                value={qnty}
                onChange={(e) => setQnty(e.target.value)}
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
                rows={3}
                placeholder="Enter description"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="form-label">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={`form-select ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">
              <i className="bi bi-plus-circle me-2"></i>Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
