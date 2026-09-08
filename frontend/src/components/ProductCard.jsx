import { formatCurrency } from "../utils/formatCurrency";

function ProductCard({ product }) {
  const productInitial = product.name.charAt(0).toUpperCase();

  return (
    <article className="product-card">
      <div
        className="product-image-placeholder"
        role="img"
        aria-label={`Image placeholder for ${product.name}`}
      >
        <span>{productInitial}</span>
      </div>

      <div className="product-card-content">
        <p className="product-sku">{product.sku}</p>

        <h2>{product.name}</h2>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-card-footer">
          <p className="product-price">
            {formatCurrency(product.price)}
          </p>

          <p className="product-availability">
            {product.availableQuantity > 0
              ? `${product.availableQuantity} available`
              : "Currently unavailable"}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;