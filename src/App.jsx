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
    <div
      style={{
        minHeight: "100vh",
        background: "#1a1a1a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        paddingTop: "40px",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <div style={{ width: "100%", maxWidth: "700px" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "40px", textAlign: "center" }}>
          Products Dashboard
        </h1>

        {/* Add product card */}
        <div
          style={{
            background: "#262626",
            padding: "25px",
            width: "100%",
            maxWidth: "500px",
            borderRadius: "10px",
            marginBottom: "40px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"
          }}
        >
          <h2 style={{ marginBottom: "20px", fontSize: "22px" }}>Add Product</h2>

          <form
            onSubmit={createProduct}
            style={{ display: "flex", gap: "10px" }}
          >
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "10px",
                flex: 1,
                borderRadius: "6px",
                border: "none",
                outline: "none",
                background: "#333",
                color: "white"
              }}
            />

            <input
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                padding: "10px",
                width: "120px",
                borderRadius: "6px",
                border: "none",
                outline: "none",
                background: "#333",
                color: "white"
              }}
            />

            <button
              style={{
                padding: "10px 18px",
                background: "#4CAF50",
                border: "none",
                color: "white",
                cursor: "pointer",
                borderRadius: "6px",
                fontWeight: "bold"
              }}
            >
              Add
            </button>
          </form>
        </div>

        {/* Product list */}
        <div
          style={{
            background: "#262626",
            padding: "25px",
            width: "100%",
            maxWidth: "500px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"
          }}
        >
          <h2 style={{ marginBottom: "20px", fontSize: "22px" }}>Products</h2>

          {products.length === 0 && (
            <p style={{ opacity: 0.7 }}>No products found.</p>
          )}

          <ul style={{ paddingLeft: 0 }}>
            {products.map((p) => (
              <li
                key={p.id}
                style={{
                  listStyle: "none",
                  background: "#333",
                  padding: "12px",
                  marginBottom: "10px",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span style={{ fontSize: "16px" }}>
                  {p.name} - ${p.price}
                </span>

                <button
                  onClick={() => deleteProduct(p.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#E53935",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
