import { useState } from "react";
import products from "./data/products";

function App() {
  const [addedProducts, setAddedProducts] = useState([]);

  function addProduct(prev, product) {
    return [...prev, { ...product, quantity: 1 }];
  }

  function updateProductQuantity(prev, product) {
    return prev.map((p) =>
      p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p,
    );
  }

  function setProductQuantity(product, value) {
    const newQuantity = Math.max(1, parseInt(value) || 1);

    setAddedProducts((prev) =>
      prev.map((p) =>
        p.name === product.name ? { ...p, quantity: newQuantity } : p,
      ),
    );
  }

  function addToCart(product) {
    setAddedProducts((prev) => {
      const existingProduct = prev.find((p) => p.name === product.name);

      if (existingProduct) {
        return updateProductQuantity(prev, product);
      }

      return addProduct(prev, product);
    });
  }

  function removeFromCart(i) {
    setAddedProducts((prev) => prev.filter((p, index) => index !== i));
  }

  const total = addedProducts.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

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
              {products.map((product) => (
                <li
                  key={product.name}
                  className="list-group-item px-0 py-3 border-bottom"
                >
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
        <div className="mx-auto shadow-sm border-0 rounded-4 p-4 bg-white mt-4">
          <h2 className="mb-4 text-center fw-bold">Carrello</h2>
          <ul className="list-group list-group-flush mt-3">
            {addedProducts.map((prod, i) => (
              <li
                key={prod.name}
                className="list-group-item px-0 py-3 border-bottom"
              >
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <h5 className="mb-1 fw-semibold">{prod.name}</h5>

                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <span className="badge text-bg-light border fs-6">
                      Prezzo: {prod.price.toFixed(2)}€
                    </span>

                    <div className="d-flex align-items-center gap-2">
                      <label htmlFor={`quantity-${prod.name}`} className="mb-0">
                        Quantità:
                      </label>
                      <input
                        id={`quantity-${prod.name}`}
                        type="number"
                        min="1"
                        step="1"
                        className="form-control"
                        style={{ width: "90px" }}
                        value={prod.quantity}
                        onChange={(e) =>
                          setProductQuantity(prod, e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <button
                    className="btn btn-danger px-4 rounded-pill"
                    onClick={() => removeFromCart(i)}
                  >
                    Rimuovi
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h4 className="pt-3">Totale spesa: {`${total.toFixed(2)}€`}</h4>
        </div>
      </div>
    </>
  );
}

export default App;
