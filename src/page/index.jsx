import React, { useState } from "react";
import Header from "../components/Header/Header";
import NewBudget from "../components/NewBudget/NewBudget";
import BudgetControl from "../components/BudgetControl/BudgetControl";
import ListBudget from "../components/ListBudget/ListBudget";
import NewBudgetModal from "../components/NewBudgetModal/NewBudgetModal";
import newBudgetImg from "../assets/img/nuevo-gasto.svg";

const index = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isAnimateModal, setIsAnimateModal] = useState(false);

  const handleNewBudget = () => {
    setIsActiveModal(true);
    setTimeout(() => {
      setIsAnimateModal(true);
    }, 500);
  };

  const saveExpense = (expense) => {
    setExpenses([...expenses, expense]);
    setIsAnimateModal(false);
    setTimeout(() => {
      setIsActiveModal(false);
    }, 500);
  };
  return (
    <>
      <div className={isActiveModal ? "fijar" : ""}>
        <div className="container-bg">
          <Header />
          <div className="container-1400">
            {isValidBudget ? (
              <>
                <BudgetControl budget={budget} expenses={expenses}/>
                <div className="nuevo-gasto">
                  <img
                    src={newBudgetImg}
                    alt="Nuevo gasto"
                    onClick={handleNewBudget}
                  />
                </div>
                {isActiveModal && (
                  <NewBudgetModal
                    isAnimateModal={isAnimateModal}
                    saveExpense={saveExpense}
                    setIsAnimateModal={setIsAnimateModal}
                    setIsActiveModal={setIsActiveModal}
                  />
                )}
              </>
            ) : (
              <NewBudget
                budget={budget}
                setBudget={setBudget}
                setIsValidBudget={setIsValidBudget}
              />
            )}
          </div>
        </div>
        <div>{isValidBudget ? <ListBudget expenses={expenses} /> : null}</div>
      </div>
    </>
  );
};

export default index;
