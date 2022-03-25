import React, { useState, useEffect } from "react";
import { formatAmount } from "../../helpers/functions";

const BudgetControl = ({ budget, expenses }) => {
  const [availableBudget, setAvailableBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  useEffect(() => {
    const totalSpent = expenses.reduce(
      (total, spent) => spent.amount + total,
      0
    );
    const totalAvailable = budget - totalSpent;
    setSpent(totalSpent);
    setAvailableBudget(totalAvailable);
  }, [expenses]);
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <p>Graphic Here</p>
      </div>
      <div className="contenido-presupuesto">
        <p>
          <span>Budget: </span> {formatAmount(budget)}
        </p>
        <p>
          <span>Available: </span> {formatAmount(availableBudget)}
        </p>
        <p>
          <span>Spent: </span> {formatAmount(spent)}
        </p>
      </div>
    </div>
  );
};

export default BudgetControl;
