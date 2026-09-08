import { useEffect, useState } from "react";

import ErrorMessage from "./components/ErrorMessage";
import ProductList from "./components/ProductList";
import { getProducts } from "./services/productApi";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError(null);

      try {
        const productData = await getProducts({
          signal: controller.signal
        });

        setProducts(productData);
      } catch (requestError) {
        if (requestError.name === "AbortError") {
          return;
        }

        setProducts([]);
        setError({
          message: requestError.message,
          statusCode: requestError.statusCode,
          requestId: requestError.requestId
        });
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      controller.abort();
    };
  }, [reloadKey]);

  function retryProductRequest() {
    setReloadKey((currentKey) => currentKey + 1);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="brand-label">Australian online retailer</p>
          <h1>MiniCart</h1>
        </div>

        <p className="header-message">
          Everyday products, clearly presented.
        </p>
      </header>

      <main>
        <section className="catalogue-introduction">
          <p className="section-label">Product catalogue</p>
          <h2>Browse our available products</h2>
          <p>
            View current product information, pricing and
            availability.
          </p>
        </section>

        {loading && (
          <section
            className="loading-state"
            aria-live="polite"
          >
            <div className="loading-indicator" aria-hidden="true" />
            <p>Loading products…</p>
          </section>
        )}

        {!loading && error && (
          <ErrorMessage
            error={error}
            onRetry={retryProductRequest}
          />
        )}

        {!loading && !error && (
          <ProductList products={products} />
        )}
      </main>

      <footer className="site-footer">
        <p>MiniCart customer catalogue</p>
      </footer>
    </div>
  );
}

export default App;