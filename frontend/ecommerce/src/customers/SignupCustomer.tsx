import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context-provider/themecontext';
import { useTranslation } from 'react-i18next';

const SignupCustomer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 const { darkMode } = useTheme();
 const { t } = useTranslation('signup');

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/customers/signup', formData);
      setMessage(`Customer "${res.data.name}" added successfully!`);
       navigate('/products'); // Redirect to product   page
      setFormData({ name: '', email: '', password: '' }); // Reset form
    } catch (err) {
      console.error(err);
      setMessage('Failed to add customer. Please try again.');
    }
  };

 return (
    <div
      className={`fluied-container d-flex justify-content-center align-items-center min-vh-100 ${
        darkMode ? 'text-white' : 'text-dark'
      }`}
      style={{
        backgroundColor: darkMode ? '#121212' : '#f0f0f0',
      }}
    >
      <div
        className={`card p-4 shadow  ${
        darkMode ? 'text-white' : 'text-dark'
      }`}
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: darkMode ? 'rgb(229 235 241 / 8%)' : '#ffffff',
          border: 'none',
          borderRadius: '12px',
        }}
      >
        <h3 className="text-center mb-4">
          <i className="fa fa-user-plus me-2"></i>{t('signup')}
        </h3>

        {message && (
          <div className="alert alert-success text-center p-2">{message}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">
              <i className="fa fa-user me-2"></i>{t('name')}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control border-secondary ${
                darkMode ? 'bg-dark text-white' : 'bg-white text-dark'
              } ${formData.name ? 'is-valid' : 'is-invalid'}`}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <i className="fa fa-envelope me-2"></i>{t('email')}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control border-secondary ${
                darkMode ? 'bg-dark text-white' : 'bg-white text-dark'
              } ${formData.email ? 'is-valid' : 'is-invalid'}`}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <i className="fa fa-lock me-2"></i>{t('password')}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-control border-secondary ${
                darkMode ? 'bg-dark text-white' : 'bg-white text-dark'
              } ${formData.password ? 'is-valid' : 'is-invalid'}`}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            <i className="fa fa-paper-plane me-2"></i>{t('signup')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupCustomer;
