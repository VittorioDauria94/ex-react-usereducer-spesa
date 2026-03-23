import { useState } from "react";
import products from "./data/products";

function App() {
  const [addedProducts, setAddedProducts] = useState([]);

  function addToCart(product) {
    setAddedProducts((prev) => {
      const existingProduct = prev.find((p) => p.name === product.name);

      if (existingProduct) {
        return prev.map((p) =>
          p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  return (
    <>
      <div className="container py-5">
        <div className="mx-auto shadow-sm border-0 rounded-4 p-4 bg-white">
          <h1 className="mb-4 text-center fw-bold">Prodotti</h1>

          <details className="dropdown">
            <summary className="btn btn-dark w-100 py-3 rounded-3 fw-semibold">
              Lista prodotti
            </summary>

            <ul className="list-group list-group-flush mt-3">
              {products.map((product, i) => (
                <li key={i} className="list-group-item px-0 py-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div>
                      <h5 className="mb-1 fw-semibold">{product.name}</h5>
                      <span className="badge text-bg-light border fs-6">
                        Prezzo: {product.price.toFixed(2)}€
                      </span>
                    </div>

                    <button
                      className="btn btn-primary px-4 rounded-pill"
                      onClick={() => addToCart(product)}
                    >
                      Aggiungi al carrello
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </details>
        </div>
        <div className="mx-auto shadow-sm border-0 rounded-4 p-4 bg-white">
          <h2 className="mb-4 text-center fw-bold">Carrello</h2>
          <ul className="list-group list-group-flush mt-3">
            {addedProducts.map((prod, i) => (
              <li key={i} className="list-group-item px-0 py-3 border-bottom">
                {prod.name} - {prod.price.toFixed(2)}€ - Quantità: {prod.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
