import { useState, useEffect } from "react";

const API = "https://my-backend-production-e956.up.railway.app";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Fetch products
  const loadProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Add product
  const createProduct = async (e) => {
    e.preventDefault();

    await fetch(`${API}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price) })
    });

    setName("");
    setPrice("");
    loadProducts();
  };

  // Delete product
  const deleteProduct = async (id) => {
    await fetch(`${API}/products/${id}`, { method: "DELETE" });
    loadProducts();
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Products Dashboard</h1>

      <h2>Add Product</h2>
      <form onSubmit={createProduct} style={{ marginBottom: "20px" }}>
        <input 
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input 
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button style={{ padding: "8px 16px" }}>Add</button>
      </form>

      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: "6px" }}>
            {p.name} - ${p.price}
            <button 
              onClick={() => deleteProduct(p.id)}
              style={{
                marginLeft: "10px",
                padding: "4px 8px",
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
