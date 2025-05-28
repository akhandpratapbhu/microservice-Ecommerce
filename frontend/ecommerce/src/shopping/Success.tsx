import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {

   const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/order"); // Change "/order" to your actual order page route
    }, 30000); // 30 seconds

    return () => clearTimeout(timer); // Cleanup in case the component unmounts early
  }, [navigate]);
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>✅</div>
        <h2 style={styles.message}>Payment Successful</h2>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: '40px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as const,
  },
  icon: {
    fontSize: '50px',
    marginBottom: '20px',
    color: 'green',
  },
  message: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default Success;
