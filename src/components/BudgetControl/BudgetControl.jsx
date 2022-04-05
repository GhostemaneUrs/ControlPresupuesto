import React, { useState, useEffect } from "react";
import { formatAmount } from "../../helpers/functions";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const BudgetControl = ({ budget, expenses }) => {
  const [percentage, setPercentage] = useState(0);
  const [availableBudget, setAvailableBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  useEffect(() => {
    const totalSpent = expenses.reduce(
      (total, spent) => spent.amount + total,
      0
    );

    const totalAvailable = budget - totalSpent;
    const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(
      2
    );
    setSpent(totalSpent);
    setAvailableBudget(totalAvailable);
    setTimeout(() => {
      setPercentage(newPercentage);
    }, 1500);
  }, [expenses]);
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar styles={
          buildStyles({
            pathColor: "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: "#3B82F6"
          })
        } value={percentage} text={`${percentage}% spent`} />
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
