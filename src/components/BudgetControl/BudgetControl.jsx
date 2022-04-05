import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { formatAmount } from "../../helpers/functions";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const BudgetControl = ({
  budget,
  setBudget,
  expenses,
  setExpenses,
  setIsValidBudget,
}) => {
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

  const handleResetApp = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset app!",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: "Reset Budget Control!",
          text: "It has been restarted successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          setBudget(0);
          setExpenses([]);
          setIsValidBudget(false);
        }, 1500);
      }
    });
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percentage > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: percentage > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={percentage}
          text={`${percentage}% spent`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Reset App
        </button>
        <p>
          <span>Budget: </span> {formatAmount(budget)}
        </p>
        <p className={`${availableBudget < 0 ? "negativo" : ""}`}>
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
