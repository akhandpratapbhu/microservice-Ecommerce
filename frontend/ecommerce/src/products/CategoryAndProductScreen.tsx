// src/components/CategoryAndProductScreen.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard';
import ProductCard from './ProductCard';
import { CircularProgress, Grid } from '@mui/material';

const CategoryAndProductScreen = () => {
  interface Category {
    id: string;
    name: string;
    image: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories on component mount
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

  const fetchProducts = async (categoryId: any) => {
    setLoading(true);
    console.log('Fetching products for category:', categoryId);

    setSelectedCategory(categoryId._id);

    try {
      const response = await axios.get(`http://localhost:8000/products/products/${categoryId._id}`);
      setProducts(response.data);
      console.log('Products:', response.data);

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log(selectedCategory);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Categories</h2>
      <div className='row'>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid container key={category.id}>
              <CategoryCard category={category} onClick={() => fetchProducts(category)} />
            </Grid>
          ))}
        </Grid>
      </div>
      {selectedCategory && <h3>Products in Category {selectedCategory}</h3>}
      <div className='row'>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {loading ? (
            <CircularProgress />
          ) : (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryAndProductScreen;
