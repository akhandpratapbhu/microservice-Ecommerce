// src/components/ProductCard.tsx
import { Card, CardContent, CardMedia, Typography, Button, CardActions, CardActionArea } from '@mui/material';
import { useCart } from '../context-provider/CartContext';
import { useTheme } from '../context-provider/themecontext';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
const { darkMode } = useTheme();
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card
      sx={{
        width: 280,
        margin: 2,
        borderRadius: 3,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={`http://localhost:3001/uploads/${product.image}`}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.primary">
            ₹{product.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button variant="contained" color="success" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
