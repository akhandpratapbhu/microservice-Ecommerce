// src/components/ProductCard.js
import { Card, CardContent, Typography } from '@mui/material';
import { useCart } from '../shopping/CartContext';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();  // add to cart 

    const send = (product:Product)=>{
        addToCart(product);
    }
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
        <img
          src={`http://localhost:3001/uploads/${product.image}`}
          alt={product.name}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            marginTop: '10px',
          }}
        />
        <Typography variant="body2">Price: ${product.price}</Typography>
        <Typography variant="body2">Description: {product.description}</Typography>
        <button style={{backgroundColor:'green'}} onClick={() => send(product)}>Add to cart</button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
