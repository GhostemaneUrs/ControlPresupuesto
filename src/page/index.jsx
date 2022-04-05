import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header/Header";
import NewBudget from "../components/NewBudget/NewBudget";
import BudgetControl from "../components/BudgetControl/BudgetControl";
import FilterExpenses from "../components/FilterExpenses/FilterExpenses";
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
  const [filter, setFilter] = useState("");
  const [expensesEdit, setExpensesEdit] = useState({});
  const [expensesFilter, setExpensesFilter] = useState([]);
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
    if (filter) {
      const expensesFilter = expenses.filter(
        (expense) => expense.category === filter
      );
      setExpensesFilter(expensesFilter);
      console.log(expensesFilter);
    }
  }, [filter]);

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
      <div className="fijar">
        <div className="container-bg mb-8">
          <Header />
          <div className="container-1400">
            {isValidBudget ? (
              <>
                <BudgetControl
                  budget={budget}
                  setBudget={setBudget}
                  expenses={expenses}
                  setExpenses={setExpenses}
                  setIsValidBudget={setIsValidBudget}
                />
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
        <div className="container-1400">
          {isValidBudget ? (
            <>
              <FilterExpenses filter={filter} setFilter={setFilter} />
              <ListBudget
                expenses={expenses}
                filter={filter}
                expensesFilter={expensesFilter}
                setExpensesEdit={setExpensesEdit}
                deleteExpense={deleteExpense}
              />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default index;
