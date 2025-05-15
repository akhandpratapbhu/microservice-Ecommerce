import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Box, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { useTheme } from "../context-provider/themecontext";
import { useLocation } from "react-router-dom";

interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
}
const CategorywiseProduct = () => {
     const location = useLocation();
  const categoryId = location.state?.categoryId;

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
const { darkMode } = useTheme();

    useEffect(() => {
        fetchProductsByCategory(categoryId);
    }, []);

    const fetchProductsByCategory = async (categoryId: string) => {
        setLoading(true);
     

        try {
            const response = await axios.get(`http://localhost:8000/products/products/${categoryId}`);
            setProducts(response.data);
               setSelectedCategory(response.data[0].category.name);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };
     const textColor = darkMode ? '#fff' : '#000';
  const backgroundColor = darkMode ? '#121212' : '#f9f9f9';
    return (
        <div   className='fluied-container min-vh-100' style={{ backgroundColor: backgroundColor }}>
            {selectedCategory && (
                <>
                    <Typography
                        variant="h5"
                        gutterBottom
                        fontWeight={500}
                        textAlign="center"
                        color={textColor}
                    >
                        Products in {selectedCategory}
                    </Typography>
                </>
            )}

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress size={40} color={darkMode ? 'inherit' : 'primary'} />
                </Box>
            ) : (
                <Grid container spacing={3} justifyContent="center" mt={2}>
                    {products.map((product) => (
                        <Grid key={product._id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    )

};
export default CategorywiseProduct;