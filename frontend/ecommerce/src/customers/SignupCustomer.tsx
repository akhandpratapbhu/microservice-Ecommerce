import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupCustomer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
  <div className="container d-flex justify-content-center align-items-center min-vh-100  text-white">
  <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'grey', border: 'none', borderRadius: '12px' }}>
    <h3 className="text-center mb-4"><i className="fa fa-user-plus me-2"></i>Sign Up</h3>

    {message && <div className="alert alert-success text-center p-2">{message}</div>}

    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label className="form-label"><i className="fa fa-user me-2"></i>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-control bg-dark text-white border-secondary ${formData.name ? 'is-valid' : 'is-invalid'}`}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label"><i className="fa fa-envelope me-2"></i>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-control bg-dark text-white border-secondary ${formData.email ? 'is-valid' : 'is-invalid'}`}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label"><i className="fa fa-lock me-2"></i>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`form-control bg-dark text-white border-secondary ${formData.password ? 'is-valid' : 'is-invalid'}`}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        <i className="fa fa-paper-plane me-2"></i>Sign Up
      </button>
    </form>
  </div>
</div>

  );
};

export default SignupCustomer;
