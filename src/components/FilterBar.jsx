function FilterBar({ currentFilter, onFilterChange, onClearCompleted }) {
  let allClassName = "";
  if (currentFilter === "all") {
    allClassName = "active";
  }

  let activeClassName = "";
  if (currentFilter === "active") {
    activeClassName = "active";
  }

  let completedClassName = "";
  if (currentFilter === "completed") {
    completedClassName = "active";
  }

  return (
    <div className="filters">
      <button 
        onClick={() => onFilterChange("all")}
        className={allClassName}
      >
        All
      </button>
      <button 
        onClick={() => onFilterChange("active")}
        className={activeClassName}
      >
        Active
      </button>
      <button 
        onClick={() => onFilterChange("completed")}
        className={completedClassName}
      >
        Completed
      </button>
      <button onClick={onClearCompleted}>Clear Completed</button>
    </div>
  );
}

export default FilterBar;
