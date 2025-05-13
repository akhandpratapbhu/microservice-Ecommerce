import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard';
import ProductCard from './ProductCard';
import {
  Box,
  CircularProgress,
  Grid,
  Container,
  Typography,
  Divider,
} from '@mui/material';

const CategoryAndProductScreen = () => {
  interface Category {
    _id: string;
    name: string;
    image: string;
  }

  interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const fetchProducts = async (category: Category) => {
    setLoading(true);
    setSelectedCategory(category.name);

    try {
      const response = await axios.get(`http://localhost:8000/products/products/${category._id}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={600} textAlign="center">
        Shop by Category
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {categories.map((category) => (
          <Grid  key={category._id}>
            <CategoryCard category={category} onClick={() => fetchProducts(category)} />
          </Grid>
        ))}
      </Grid>

      {selectedCategory && (
        <>
          <Divider sx={{ my: 5 }} />
          <Typography variant="h5" gutterBottom fontWeight={500} textAlign="center">
            Products in {selectedCategory}
          </Typography>
        </>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress size={40} />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center" mt={2}>
          {products.map((product) => (
            <Grid  key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CategoryAndProductScreen;
