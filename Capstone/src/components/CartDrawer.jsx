function CartDrawer({ items, total, onRemove, onUpdateQuantity }) {
  return (
    <aside className="cart-drawer">
      <h2>Shopping cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty. Add a product to start shopping.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-meta">
                <strong>{item.name}</strong>
                <span>${item.price.toFixed(2)} each</span>
                <span>Subtotal: ${(item.price * item.quantity).toFixed(2)}</span>
              </div>

              <div>
                <div className="quantity-control">
                  <button type="button" onClick={() => onUpdateQuantity(item.id, -1)}>
                    –
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => onUpdateQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
                <button type="button" className="btn-primary" onClick={() => onRemove(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </aside>
  );
}

export default CartDrawer;
