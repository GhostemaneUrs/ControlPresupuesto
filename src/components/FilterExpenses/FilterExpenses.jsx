import React from "react";

const FilterExpenses = ({ filter, setFilter }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="expense-filter">Expenses filter</label>
          <select
            name="expense-filter"
            value={filter}
            id="expense-filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="saving">Saving</option>
            <option value="food">Food</option>
            <option value="home">Home</option>
            <option value="health">Health</option>
            <option value="leisure">Leisure</option>
            <option value="miscellaniousExpense">Miscellaneous Expenses</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default FilterExpenses;
