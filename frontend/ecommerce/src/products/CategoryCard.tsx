// src/components/CategoryCard.tsx
import React from 'react';
import { Card, CardContent, CardActionArea, Typography } from '@mui/material';

interface CategoryCardProps {
  category: {
    _id: string;
    name: string;
    image: string;
  };
  onClick: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <Card
      sx={{
        margin: 2,
        width: 350,
        height: 300,
        borderRadius: 3,
        boxShadow: 3,
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
      }}
      onClick={() => onClick(category._id)}
    >
      <CardActionArea sx={{ height: '100%' }}>
        <img
          src={`http://localhost:3001/uploads/${category.image}`}
          alt={category.name}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6" component="div" fontWeight={600}>
            {category.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
