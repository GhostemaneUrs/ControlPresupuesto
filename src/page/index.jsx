import React, { useState } from "react";
import Header from "../components/Header/Header";
import NewBudget from "../components/NewBudget/NewBudget";
import BudgetControl from "../components/BudgetControl/BudgetControl";

const index = () => {
  const [budget, setBudget] = useState(0);
  const [isValidBudget, setIsValidBudget] = useState(false);
  return (
    <>
      <div className="container-bg">
        <Header />
        <div className="container-1400">
          {isValidBudget ? (
            <BudgetControl budget={budget} />
          ) : (
            <NewBudget
              budget={budget}
              setBudget={setBudget}
              setIsValidBudget={setIsValidBudget}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default index;
