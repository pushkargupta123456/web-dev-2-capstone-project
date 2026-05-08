import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import ProductCard from './components/ProductCard.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import productsData from './data/products.js';

const categories = ['All', ...new Set(productsData.map((product) => product.category))];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="app-shell">
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        cartTotal={totalPrice}
        search={search}
        onSearch={setSearch}
        category={category}
        categories={categories}
        onCategory={setCategory}
      />

      <main className="page-content">
        <section className="hero-panel">
          <div>
            <span className="eyebrow">Curated marketplace</span>
            <h1>Explore premium products with effortless search and checkout</h1>
            <p>Experience a polished online storefront designed for intuitive browsing, smart filtering, and seamless cart management.</p>
          </div>
          <div className="hero-stats">
            <div>
              <strong>50+</strong>
              <span>Brands</span>
            </div>
            <div>
              <strong>120+</strong>
              <span>Products</span>
            </div>
            <div>
              <strong>React</strong>
              <span>Responsive UI</span>
            </div>
          </div>
        </section>

        <section className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={() => addToCart(product)} />
            ))
          ) : (
            <div className="empty-state">
              <h2>No products found</h2>
              <p>Try a different category or search term.</p>
            </div>
          )}
        </section>
      </main>

      <CartDrawer
        items={cartItems}
        total={totalPrice}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}

export default App;
