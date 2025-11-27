import { useState, useEffect } from "react";

const API = "https://my-backend-production-e956.up.railway.app";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch products
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
      setErrorMsg("");
    } catch (err) {
      setErrorMsg("Failed to load products. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Add product
  const createProduct = async (e) => {
    e.preventDefault();

    // basic validation
    if (!name.trim()) {
      setErrorMsg("Name cannot be empty.");
      return;
    }
    if (isNaN(price) || Number(price) < 0) {
      setErrorMsg("Price must be a valid non-negative number.");
      return;
    }

    try {
      setErrorMsg("");
      await fetch(`${API}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price: Number(price) })
      });

      setName("");
      setPrice("");
      loadProducts();
    } catch (err) {
      setErrorMsg("Failed to add product.");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      setErrorMsg("");
      await fetch(`${API}/products/${id}`, { method: "DELETE" });
      loadProducts();
    } catch (err) {
      setErrorMsg("Failed to delete product.");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Products Dashboard</h1>

      {/* Error Message */}
      {errorMsg && (
        <p style={{ color: "red", marginBottom: "20px" }}>{errorMsg}</p>
      )}

      {/* Add Product */}
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

      {/* Products */}
      <h2>Products</h2>

      {loading && <p style={{ color: "gray" }}>Loading...</p>}

      {!loading && products.length === 0 && (
        <p style={{ color: "gray" }}>No products found. Add one above.</p>
      )}

      {!loading && products.length > 0 && (
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
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
