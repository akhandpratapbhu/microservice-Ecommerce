import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard';
import {
  Grid,
  Typography,
} from '@mui/material';
import { useTheme } from '../context-provider/themecontext';
import { useNavigate } from 'react-router-dom';

const CategoryAndProductScreen = () => {
  interface Category {
    _id: string;
    name: string;
    image: string;
  }
  const [categories, setCategories] = useState<Category[]>([]);
  const { darkMode } = useTheme();
  const navigate = useNavigate();
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

  const fetchProductsByCategory = async (category: Category) => {

    // Navigate and send the id
    navigate('/category-products', { state: { categoryId: category._id } });

  };
  const textColor = darkMode ? '#fff' : '#000';
  const backgroundColor = darkMode ? '#121212' : '#f9f9f9';
  return (
    <div
      className='fluied-container min-vh-100' style={{ backgroundColor: backgroundColor }}
    >
      <Typography
        variant="h4"
        gutterBottom
        fontWeight={600}
        textAlign="center"
        color={textColor}
      >
        Shop by Category
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {categories.map((category) => (
          <Grid key={category._id}>
            <CategoryCard
              category={category}
              onClick={() => fetchProductsByCategory(category)}
            />
          </Grid>
        ))}
      </Grid>

    </div>
  );
};

export default CategoryAndProductScreen;
