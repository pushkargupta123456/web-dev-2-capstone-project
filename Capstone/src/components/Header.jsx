function Header({ cartCount, cartTotal, category, categories, onCategory, search, onSearch }) {
  return (
    <header className="app-header">
      <div>
        <h1>Shopfront.</h1>
        <p>Simple product browsing with search, categories, and cart management.</p>
      </div>

      <div className="header-meta">
        <span>{cartCount} items</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>

      <div className="search-bar">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(event) => onSearch(event.target.value)}
        />
      </div>

      <div className="category-list">
        {categories.map((name) => (
          <button
            key={name}
            type="button"
            className={`category-pill ${category === name ? 'active' : ''}`}
            onClick={() => onCategory(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </header>
  );
}

export default Header;
