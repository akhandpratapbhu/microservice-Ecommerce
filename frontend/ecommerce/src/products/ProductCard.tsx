// src/components/ProductCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Product {
  name: string;
  price: number;
  description: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card
      style={{
        margin: '20px',
        width: '250px',
        display: 'inline-block',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">Price: ${product.price}</Typography>
        <Typography variant="body2">Description: {product.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
