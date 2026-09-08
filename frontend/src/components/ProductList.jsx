import ProductCard from "./ProductCard";

function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <section className="empty-state" aria-live="polite">
        <h2>No products are currently available</h2>
        <p>Please check again later.</p>
      </section>
    );
  }

  return (
    <section
      className="product-grid"
      aria-label="Available products"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}

export default ProductList;