function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <div>
        <span className="eyebrow">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <div className="actions">
        <p className="price">${product.price}</p>
        <button type="button" className="btn-primary" onClick={onAdd}>
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
