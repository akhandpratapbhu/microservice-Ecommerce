// src/components/CategoryCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    image: string;
  };
  onClick: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <Card
      onClick={() => onClick(category.id)}
      style={{
        margin: '20px',
        cursor: 'pointer',
        width: '400px',
        height: '300px',
        overflow: 'hidden',
        textAlign: 'center',
        display: 'inline-block',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent>
        <>
        <Typography variant="h6">{category.name}</Typography>
       <img
  src={`http://localhost:3001/uploads/${category.image}`}
  alt={category.name}
  style={{
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginTop: '10px',
  }}
/>

          </>         
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
