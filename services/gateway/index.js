const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
//app.use(express.json());
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(
  "/products",
  proxy("http://localhost:3001", {
    proxyReqPathResolver: (req) => {
      // remove '/products' prefix
      return req.originalUrl.replace("/products", "");
    },
  })
);


app.use(
  "/customers",
  proxy("http://localhost:3002", {
    proxyReqPathResolver: (req) => {
      return req.originalUrl.replace("/customers", "");
    },
  })
);

app.use(
  "/shopping",
  proxy("http://localhost:4242", {
    proxyReqPathResolver: (req) => {
      return req.originalUrl.replace("/shopping", "");
    },
  })
);

app.listen(8000, () => {
  console.log("API Gateway is listening on port 8000");
});
