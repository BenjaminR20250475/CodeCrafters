function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={category === selected ? 'filter-button active' : 'filter-button'}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
