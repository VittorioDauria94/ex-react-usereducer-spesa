import { useReducer } from "react";
import products from "./data/products";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const product = action.payload;
      const existingProduct = state.find((item) => item.name === product.name);

      if (existingProduct) {
        return state.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...state, { ...product, quantity: 1 }];
    }

    case "REMOVE_ITEM": {
      const productName = action.payload;

      return state.filter((item) => item.name !== productName);
    }

    case "UPDATE_QUANTITY": {
      const { productName, value } = action.payload;
      const newQuantity = Math.max(1, parseInt(value) || 1);

      return state.map((item) =>
        item.name === productName ? { ...item, quantity: newQuantity } : item,
      );
    }

    default:
      return state;
  }
}

function App() {
  const [addedProducts, dispatch] = useReducer(cartReducer, []);

  const total = addedProducts.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

  return (
    <>
      <div className="container py-5">
        <div className="mx-auto shadow-sm border-0 rounded-4 p-4 bg-white">
          <h1 className="mb-4 text-center fw-bold">Prodotti</h1>

          <div>
            <div className="btn btn-dark w-100 py-3 rounded-3 fw-semibold">
              Lista prodotti
            </div>

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
                      onClick={() =>
                        dispatch({ type: "ADD_ITEM", payload: product })
                      }
                    >
                      Aggiungi al carrello
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {addedProducts.length > 0 && (
          <div className="mx-auto shadow-sm border-0 rounded-4 p-4 bg-white mt-4">
            <h2 className="mb-4 text-center fw-bold">Carrello</h2>

            <ul className="list-group list-group-flush mt-3">
              {addedProducts.map((prod) => (
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
                        <label
                          htmlFor={`quantity-${prod.name}`}
                          className="mb-0"
                        >
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
                            dispatch({
                              type: "UPDATE_QUANTITY",
                              payload: {
                                productName: prod.name,
                                value: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>

                    <button
                      className="btn btn-danger px-4 rounded-pill"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_ITEM",
                          payload: prod.name,
                        })
                      }
                    >
                      Rimuovi
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <h4 className="pt-3">Totale spesa: {total.toFixed(2)}€</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
