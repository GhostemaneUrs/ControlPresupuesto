import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { formatAmount } from "../helpers/functions";
import Header from "../components/Header/Header";
import NewBudget from "../components/NewBudget/NewBudget";
import BudgetControl from "../components/BudgetControl/BudgetControl";
import ListBudget from "../components/ListBudget/ListBudget";
import NewBudgetModal from "../components/NewBudgetModal/NewBudgetModal";
import newBudgetImg from "../assets/img/nuevo-gasto.svg";

const index = () => {
  const uniqueId = uuidv4();
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("Budget")) ?? 0
  );
  const [expenses, setExpenses] = useState(
    localStorage.getItem("Expenses")
      ? JSON.parse(localStorage.getItem("Expenses"))
      : []
  );
  const [expensesEdit, setExpensesEdit] = useState({});
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isAnimateModal, setIsAnimateModal] = useState(false);

  useEffect(() => {
    if (Object.keys(expensesEdit).length > 0) {
      setIsActiveModal(true);
      setTimeout(() => {
        setIsAnimateModal(true);
      }, 500);
    }
  }, [expensesEdit]);

  useEffect(() => {
    localStorage.setItem("Budget", budget ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("Expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    const budgetLs = Number(localStorage.getItem("Budget") ?? 0);
    if (budgetLs > 0) {
      setIsValidBudget(true);
    }
  }, []);

  const handleNewBudget = () => {
    setIsActiveModal(true);
    setExpensesEdit({});
    setTimeout(() => {
      setIsAnimateModal(true);
    }, 500);
  };

  const saveExpense = (expense) => {
    if (expense.id) {
      const updateExpense = expenses.map((item) =>
        item.id === expense.id ? expense : item
      );
      setExpenses(updateExpense);
      setExpensesEdit({});
    } else {
      expense.id = uniqueId;
      setExpenses([...expenses, expense]);
    }
    setIsAnimateModal(false);
    setTimeout(() => {
      setIsActiveModal(false);
    }, 500);
  };

  const deleteExpense = (id) => {
    const updateExpense = expenses.filter((item) => item.id !== id);
    setExpenses(updateExpense);
  };
  return (
    <>
      <div className={isActiveModal ? "fijar" : ""}>
        <div className="container-bg">
          <Header />
          <div className="container-1400">
            {isValidBudget ? (
              <>
                <BudgetControl budget={budget} expenses={expenses} />
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
                    expensesEdit={expensesEdit}
                    setExpensesEdit={setExpensesEdit}
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
        <div>
          {isValidBudget ? (
            <ListBudget
              expenses={expenses}
              setExpensesEdit={setExpensesEdit}
              deleteExpense={deleteExpense}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default index;
