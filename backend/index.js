import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 4500;
app.use(express.json());
app.use(cors());
const products = [
  {
    id: 1,
    name: "table",
    price: 200,
  },
  {
    id: 2,
    name: "chair",
    price: 150,
  },
  {
    id: 3,
    name: "desk",
    price: 500,
  },
  {
    id: 4,
    name: "fan",
    price: 800,
  },
  {
    id: 5,
    name: "tv",
    price: 5000,
  },
];
app.get("/api/products", (req, resp) => {
  //   console.log(req.query.search);
  if (req.query.search) {
    const searchedProducts = products.filter((product) =>
      product.name.includes(req.query.search)
    );
    resp.send(searchedProducts);
    return;
  }
  setTimeout(() => {
    resp.send(products);
  }, 2000);
});

app.listen(port, () => {
  console.log(`server running on port http://localhost:${port}/api/products`);
});
